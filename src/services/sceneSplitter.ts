import { SceneSplitResult, Scene, ReadingSpeed } from '../types/longScript'

/**
 * Reading speed configurations for different horror styles
 */
export const READING_SPEED_CONFIGS = {
  slow: { label: 'Slow Horror', charsPerSecond: 9, description: 'Rất chậm, hồi hộp (8-10 ký tự/s)', recommended: false },
  standard: { label: 'Standard Horror', charsPerSecond: 11, description: 'Tốc độ chuẩn (10-12 ký tự/s)', recommended: true },
  fast: { label: 'Fast Horror', charsPerSecond: 13.5, description: 'Nhanh, kịch tính (12-15 ký tự/s)', recommended: false }
}

/**
 * AI-powered scene splitter
 * Automatically splits long script into scenes suitable for 5-second videos
 */
export async function splitScriptIntoScenes(
  script: string, 
  apiKey: string,
  sceneDuration: number = 5,
  readingSpeed: ReadingSpeed = 'standard'
): Promise<SceneSplitResult> {
  try {
    const speedConfig = READING_SPEED_CONFIGS[readingSpeed]
    const targetScenes = Math.ceil((script.length / speedConfig.charsPerSecond) / sceneDuration)
    const charsPerScene = Math.floor(script.length / targetScenes)
    
    const systemPrompt = `Bạn là chuyên gia phân tích kịch bản phim kinh dị/bí ẩn.

NHIỆM VỤ: Chia kịch bản dài thành các SCENES ngắn, mỗi scene phù hợp cho video ${sceneDuration} giây.

YÊU CẦU QUAN TRỌNG:
- Tổng số scenes cần tạo: KhoẢng ${targetScenes} scenes
- Mỗi scene nên có khoảng ${charsPerScene}-${charsPerScene + 20} ký tự
- Tốc độ đọc mục tiêu: ${speedConfig.charsPerSecond} ký tự/giây (${speedConfig.label})
- Chia NHIỀU scenes hơn để video không bị vội vã

NGUYÊN TẮC CHIA SCENES:
1. Mỗi scene phải là một CẢNH QUAY HOÀN CHỈNH (complete shot)
2. Mỗi scene có MỘT hành động/sự kiện chính
3. Chia tại điểm chuyển cảnh tự nhiên (cut points)
4. Mỗi scene phải có đủ chi tiết để tạo video ${sceneDuration}s
5. Giữ nguyên thứ tự câu chuyện
6. CHIA NHỎ để tránh nói quá nhanh - mỗi scene ~${charsPerScene} ký tự

VÍ DỤ CHIA SCENES TỐT (cho video kinh dị mượt mà):
- Scene 1: "Căn phòng tối tăm, chỉ có ngọn nến nhấp nháy, ánh sáng le lói chiếu lên bức tường rêu phong."
- Scene 2: "Camera từ từ zoom vào tấm gương cổ, khung gương bị nứt vỡ nhiều chỗ."
- Scene 3: "Trong gương, một bóng đen mờ ảo từ từ hiện lên, ngày càng rõ nét."
- Scene 4: "Đôi mắt trắng bệch nhìn thẳng ra, không chớp, không cử động."

VÍ DỤ CHIA SCENES XẤU:
- Scene quá dài: "Căn phòng tối, nến le lói, camera zoom vào gương, bóng người hiện ra, đôi mắt nhìn..." (quá nhiều hành động, quá nhiều ký tự)
- Scene quá ngắn: "Nến" (thiếu ngữ cảnh, quá ít ký tự)

OUTPUT FORMAT (JSON):
{
  "scenes": [
    {
      "sceneNumber": 1,
      "scriptText": "Mô tả scene chi tiết (~${charsPerScene} ký tự)...",
      "duration": ${sceneDuration},
      "note": "Ghi chú ngắn về scene này"
    }
  ]
}

QUAN TRỌNG: Phải tạo đủ ${targetScenes} scenes để video không bị vội vã!`;

    const userPrompt = `Kịch bản cần chia (${script.length} ký tự):\n\n${script}\n\nHãy chia thành KhoẢNG ${targetScenes} scenes (mỗi scene ~${charsPerScene} ký tự) theo format JSON yêu cầu.`;

    // Get working model from test (FREE TIER compatible)
    const workingModel = (window as any).__workingGeminiModel || 'gemini-1.5-flash';

    const apiResponse = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/${workingModel}:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [
              { text: systemPrompt },
              { text: userPrompt }
            ]
          }]
        })
      }
    );

    if (!apiResponse.ok) {
      const errorData = await apiResponse.json();
      throw new Error(errorData.error?.message || `HTTP ${apiResponse.status}`);
    }

    const data = await apiResponse.json();
    let text = data.candidates[0]?.content?.parts[0]?.text || '';

    // Clean up response
    text = text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();

    // Parse JSON
    let jsonData;
    try {
      jsonData = JSON.parse(text);
    } catch (e) {
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        jsonData = JSON.parse(jsonMatch[0]);
      } else {
        throw new Error('Không thể parse JSON từ response');
      }
    }

    // Transform to Scene format
    const scenes: Omit<Scene, 'id' | 'prompt'>[] = jsonData.scenes.map((scene: any, index: number) => ({
      sceneNumber: scene.sceneNumber || index + 1,
      startTime: index * sceneDuration,
      endTime: (index + 1) * sceneDuration,
      duration: scene.duration || sceneDuration,
      scriptText: scene.scriptText || '',
      note: scene.note
    }));

    // Apply auto-split to ensure we reach target scene count
    const finalScenes = autoSplitLongScenes(scenes, targetScenes, sceneDuration);

    return {
      scenes: finalScenes,
      totalScenes: finalScenes.length,
      estimatedDuration: finalScenes.length * sceneDuration
    };

  } catch (error: any) {
    console.error('Scene split error:', error);
    
    // Fallback: Character-based split with reading speed
    console.log('Falling back to character-based split...');
    return fallbackSceneSplit(script, sceneDuration, readingSpeed);
  }
}

/**
 * Auto-split long scenes to reach target scene count
 * This ensures we get enough scenes for proper reading speed
 */
function autoSplitLongScenes(
  scenes: Omit<Scene, 'id' | 'prompt'>[],
  targetScenes: number,
  sceneDuration: number
): Omit<Scene, 'id' | 'prompt'>[] {
  const currentCount = scenes.length
  const threshold = Math.floor(targetScenes * 0.8) // 80% of target
  
  // If we have enough scenes, return as-is
  if (currentCount >= threshold) {
    console.log(`✅ Scene count OK: ${currentCount} >= ${threshold} (80% of target ${targetScenes})`)
    return scenes
  }
  
  console.log(`⚠️ Too few scenes: ${currentCount} < ${threshold}. Auto-splitting...`)
  
  const result: Omit<Scene, 'id' | 'prompt'>[] = []
  const scenesNeeded = targetScenes - currentCount
  
  // Sort scenes by length to find candidates for splitting
  const sortedIndices = scenes
    .map((scene, idx) => ({ idx, length: scene.scriptText.length }))
    .sort((a, b) => b.length - a.length)
  
  let sceneNumber = 1
  let splitCount = 0
  
  scenes.forEach((scene, originalIdx) => {
    // Check if this scene should be split
    const shouldSplit = 
      splitCount < scenesNeeded && 
      sortedIndices.slice(0, scenesNeeded).some(s => s.idx === originalIdx) &&
      scene.scriptText.length > 60 // Only split if scene has >60 chars
    
    if (shouldSplit) {
      // Split into 2 scenes
      const midPoint = Math.floor(scene.scriptText.length / 2)
      
      // Find best split point (sentence boundary or space)
      let splitPoint = midPoint
      const searchRange = 20
      
      // Try to find sentence end
      for (let i = midPoint - searchRange; i < midPoint + searchRange && i < scene.scriptText.length; i++) {
        if (scene.scriptText[i] === '.' || scene.scriptText[i] === '!' || scene.scriptText[i] === '?') {
          splitPoint = i + 1
          break
        }
      }
      
      // Fallback to space
      if (splitPoint === midPoint) {
        for (let i = midPoint - searchRange; i < midPoint + searchRange && i < scene.scriptText.length; i++) {
          if (scene.scriptText[i] === ' ') {
            splitPoint = i
            break
          }
        }
      }
      
      const part1 = scene.scriptText.substring(0, splitPoint).trim()
      const part2 = scene.scriptText.substring(splitPoint).trim()
      
      if (part1.length > 20 && part2.length > 20) {
        result.push({
          sceneNumber: sceneNumber++,
          startTime: (sceneNumber - 1) * sceneDuration,
          endTime: sceneNumber * sceneDuration,
          duration: sceneDuration,
          scriptText: part1,
          note: scene.note ? `${scene.note} (Part 1)` : undefined
        })
        
        result.push({
          sceneNumber: sceneNumber++,
          startTime: (sceneNumber - 1) * sceneDuration,
          endTime: sceneNumber * sceneDuration,
          duration: sceneDuration,
          scriptText: part2,
          note: scene.note ? `${scene.note} (Part 2)` : undefined
        })
        
        splitCount++
        console.log(`  ➡️ Split scene ${originalIdx + 1}: ${scene.scriptText.length} chars → ${part1.length} + ${part2.length} chars`)
      } else {
        // Can't split well, keep original
        result.push({
          ...scene,
          sceneNumber: sceneNumber++,
          startTime: (sceneNumber - 1) * sceneDuration,
          endTime: sceneNumber * sceneDuration
        })
      }
    } else {
      // Keep original scene
      result.push({
        ...scene,
        sceneNumber: sceneNumber++,
        startTime: (sceneNumber - 1) * sceneDuration,
        endTime: sceneNumber * sceneDuration
      })
    }
  })
  
  console.log(`✅ Auto-split complete: ${currentCount} → ${result.length} scenes (target: ${targetScenes})`)
  return result
}

/**
 * Fallback method: Character-based split optimized for reading speed
 */
function fallbackSceneSplit(
  script: string, 
  sceneDuration: number, 
  readingSpeed: ReadingSpeed = 'standard'
): SceneSplitResult {
  const speedConfig = READING_SPEED_CONFIGS[readingSpeed]
  const targetScenes = Math.ceil((script.length / speedConfig.charsPerSecond) / sceneDuration)
  const charsPerScene = Math.floor(script.length / targetScenes)
  
  console.log(`Fallback split: ${script.length} chars → ${targetScenes} scenes (~${charsPerScene} chars/scene)`)

  const scenes: Omit<Scene, 'id' | 'prompt'>[] = [];
  let sceneNumber = 1;
  
  // Try to split by paragraphs first
  const paragraphs = script
    .split(/\n\n+/)
    .filter(p => p.trim().length > 0)
    .map(p => p.trim());

  paragraphs.forEach(paragraph => {
    // If paragraph is close to target length, use it as one scene
    if (paragraph.length >= charsPerScene * 0.7 && paragraph.length <= charsPerScene * 1.3) {
      scenes.push({
        sceneNumber: sceneNumber++,
        startTime: (sceneNumber - 1) * sceneDuration,
        endTime: sceneNumber * sceneDuration,
        duration: sceneDuration,
        scriptText: paragraph
      });
    }
    // If paragraph is too long, split by sentences
    else if (paragraph.length > charsPerScene * 1.3) {
      const sentences = paragraph.match(/[^.!?]+[.!?]+/g) || [paragraph];
      let buffer = '';
      
      sentences.forEach((sentence, idx) => {
        const trimmed = sentence.trim();
        if (buffer.length + trimmed.length <= charsPerScene * 1.5) {
          buffer += (buffer ? ' ' : '') + trimmed;
        } else {
          if (buffer) {
            scenes.push({
              sceneNumber: sceneNumber++,
              startTime: (sceneNumber - 1) * sceneDuration,
              endTime: sceneNumber * sceneDuration,
              duration: sceneDuration,
              scriptText: buffer
            });
          }
          buffer = trimmed;
        }
        
        // Push last buffer
        if (idx === sentences.length - 1 && buffer) {
          scenes.push({
            sceneNumber: sceneNumber++,
            startTime: (sceneNumber - 1) * sceneDuration,
            endTime: sceneNumber * sceneDuration,
            duration: sceneDuration,
            scriptText: buffer
          });
        }
      });
    }
    // If paragraph is too short, combine with next or add as-is
    else {
      scenes.push({
        sceneNumber: sceneNumber++,
        startTime: (sceneNumber - 1) * sceneDuration,
        endTime: sceneNumber * sceneDuration,
        duration: sceneDuration,
        scriptText: paragraph
      });
    }
  });

  return {
    scenes,
    totalScenes: scenes.length,
    estimatedDuration: scenes.length * sceneDuration
  };
}

/**
 * Format time in MM:SS format
 */
export function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}
