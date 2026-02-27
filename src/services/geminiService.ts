// import { GoogleGenerativeAI } from '@google/generative-ai' // Not used in current implementation;
import { PromptResult, ApiKeyTestResult } from '../types';

// Test API key
export async function testApiKey(apiKey: string): Promise<ApiKeyTestResult> {
  try {
    // Check if user manually selected a model
    const userSelectedModel = (window as any).__userSelectedModel;
    const preselectedModel = (window as any).__workingGeminiModel;
    
    // If user selected a specific model, only try that one
    if (userSelectedModel && preselectedModel) {
      const modelsToTry = [preselectedModel];
      
      for (const modelName of modelsToTry) {
        try {
          const response = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/${modelName}:generateContent?key=${apiKey}`,
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                contents: [{
                  parts: [{ text: 'Hello' }]
                }]
              })
            }
          );
          
          if (response.ok) {
            const data = await response.json();
            if (data.candidates && data.candidates.length > 0) {
              const isFreeModel = modelName.includes('1.5') || modelName.includes('gemini-pro');
              const isPaidModel = modelName.includes('2.0') || modelName.includes('exp');
              
              let tierInfo = '';
              if (isFreeModel) {
                tierInfo = ' 🆓 (FREE Tier)';
              } else if (isPaidModel) {
                tierInfo = ' 💎 (PAID/Experimental Tier)';
              }
              
              return {
                success: true,
                message: `✅ API Key hợp lệ!${tierInfo}\n🎯 Model đã chọn: ${modelName}`
              };
            }
          } else {
            const errorData = await response.json();
            return {
              success: false,
              message: `❌ Model "${modelName}" không hoạt động!\n${errorData.error?.message || 'Unknown error'}\n\n💡 Thử chọn "Tự động" hoặc model khác.`,
              error: errorData.error?.message
            };
          }
        } catch (err: any) {
          return {
            success: false,
            message: `❌ Lỗi khi test model "${modelName}"!\n${err.message}\n\n💡 Thử chọn "Tự động" hoặc model khác.`,
            error: err.message
          };
        }
      }
    }
    
    // Auto mode: Try models in order: FREE first, then PAID/newer models
    // This ensures compatibility with both free and paid tiers
    const modelsToTry = [
      // === FREE TIER MODELS (Try first) ===
      'gemini-1.5-flash',              // FREE - Fast & stable
      'gemini-1.5-pro',                // FREE - Better quality
      'gemini-pro',                    // FREE - Legacy
      
      // === PAID/NEWER MODELS (Better for paid keys) ===
      'gemini-2.0-flash-exp',          // PAID - Experimental, faster
      'models/gemini-2.0-flash-exp',
      'models/gemini-1.5-flash-latest',
      'models/gemini-1.5-pro-latest',
      
      // === FALLBACK MODELS ===
      'models/gemini-1.5-flash',
      'models/gemini-1.5-pro',
      'models/gemini-pro',
      'models/gemini-flash-latest',
      'models/gemini-pro-latest'
    ];
    
    for (const modelName of modelsToTry) {
      try {
        const response = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/${modelName}:generateContent?key=${apiKey}`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              contents: [{
                parts: [{ text: 'Hello' }]
              }]
            })
          }
        );
        
        if (response.ok) {
          const data = await response.json();
          if (data.candidates && data.candidates.length > 0) {
            // Store working model name
            (window as any).__workingGeminiModel = modelName;
            
            // Detect if FREE or PAID tier based on model
            const isFreeModel = modelName.includes('1.5') || modelName.includes('gemini-pro');
            const isPaidModel = modelName.includes('2.0') || modelName.includes('exp');
            
            let tierInfo = '';
            if (isFreeModel) {
              tierInfo = ' 🆓 (FREE Tier)';
            } else if (isPaidModel) {
              tierInfo = ' 💎 (PAID/Experimental Tier)';
            }
            
            return {
              success: true,
              message: `✅ API Key hợp lệ!${tierInfo}\nModel: ${modelName}`
            };
          }
        }
        
        // Log the error for debugging
        console.log(`Model ${modelName} returned status: ${response.status}`);
        
      } catch (err: any) {
        console.log(`Model ${modelName} failed:`, err.message);
        continue;
      }
    }
    
    // If all models failed, try to list available models
    try {
      const listResponse = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`
      );
      
      if (listResponse.ok) {
        const listData = await listResponse.json();
        console.log('Available models:', listData);
        
        return {
          success: false,
          message: '❌ Không tìm thấy model phù hợp. Vui lòng check Console (F12) để xem models có sẵn.',
          error: 'No compatible model found'
        };
      }
    } catch (listErr) {
      console.error('Failed to list models:', listErr);
    }
    
    return {
      success: false,
      message: '❌ Không thể kết nối với Gemini API. Vui lòng kiểm tra lại API key.',
      error: 'All models failed'
    };
    
  } catch (error: any) {
    console.error('API Key test error:', error);
    
    return {
      success: false,
      message: `❌ Lỗi: ${error.message || 'Không thể kết nối'}`,
      error: error.message
    };
  }
}

// Generate image from prompt using Gemini Imagen
export async function generateImage(prompt: string, apiKey: string): Promise<string> {
  try {
    console.log('🎨 [IMAGE] Starting image generation...')
    console.log('   - Prompt:', prompt.substring(0, 100) + '...')
    
    // Use Imagen 3 via Gemini API
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/imagen-3.0-generate-001:predict?key=${apiKey}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          instances: [{
            prompt: prompt
          }],
          parameters: {
            sampleCount: 1,
            aspectRatio: '16:9',
            negativePrompt: 'blurry, low quality, distorted',
            safetySetting: 'block_some'
          }
        })
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      console.error('❌ [IMAGE] API Error:', errorData);
      
      // Check if quota error
      if (response.status === 429 || errorData.error?.message?.includes('quota')) {
        throw new Error('QUOTA_EXHAUSTED');
      }
      
      throw new Error(errorData.error?.message || `HTTP ${response.status}`);
    }

    const data = await response.json();
    console.log('✅ [IMAGE] Response received');
    
    // Extract image URL from response
    const imageData = data.predictions?.[0]?.bytesBase64Encoded;
    if (!imageData) {
      throw new Error('No image data in response');
    }
    
    // Convert base64 to data URL
    const imageUrl = `data:image/png;base64,${imageData}`;
    console.log('✅ [IMAGE] Image generated successfully');
    
    return imageUrl;
    
  } catch (error: any) {
    console.error('❌ [IMAGE] Generation error:', error);
    
    if (error.message === 'QUOTA_EXHAUSTED') {
      throw error;
    }
    
    if (error.message?.includes('quota') || error.message?.includes('429')) {
      throw new Error('QUOTA_EXHAUSTED');
    }
    
    throw new Error(`Lỗi khi tạo ảnh: ${error.message || 'Unknown error'}`);
  }
}

// Generate horror/mystery prompt for Sora
export async function generatePrompt(script: string, apiKey: string): Promise<PromptResult> {
  try {
    
    // Use direct REST API call with v1beta
    const systemPrompt = `Bạn là chuyên gia tạo prompt cho Sora AI - công cụ tạo video từ văn bản.
    
NHIỆM VỤ: Chuyển đổi kịch bản tiếng Việt về chủ đề KINH DỊ/BÍ ẨN thành prompt tiếng Anh chi tiết cho Sora để tạo video 5 giây.

YÊU CẦU PROMPT:
1. Prompt phải bằng TIẾNG ANH, chi tiết, cinematic
2. Tập trung vào thể loại HORROR/MYSTERY
3. Mô tả rõ: cảnh quay, ánh sáng, góc máy, chuyển động, màu sắc, âm thanh
4. Tạo cảm giác ghê rợn, bí ẩn, hồi hộp
5. Độ dài: 2-3 câu, khoảng 50-100 từ
6. Phù hợp cho video 5 giây

ĐẶC ĐIỂM HORROR/MYSTERY CẦN CÓ:
- Ánh sáng: dim, shadows, flickering lights, moonlight, candles
- Góc máy: dutch angle, slow zoom, tracking shot, POV
- Màu sắc: desaturated, blue tones, dark palette, red accents
- Chuyển động: slow motion, sudden movements, creepy reveals
- Âm thanh: eerie silence, whispers, creaking, ambient horror

ĐỊNH DẠNG TRẢ VỀ (JSON):
{
  "prompt": "Chi tiết prompt tiếng Anh...",
  "duration": 5,
  "style": "Phong cách phù hợp (vd: cinematic horror, found footage, supernatural thriller)",
  "mood": "Tâm trạng (vd: eerie, terrifying, mysterious, unsettling)",
  "camera": "Kỹ thuật quay (vd: slow zoom in, dutch angle, handheld POV)",
  "lighting": "Ánh sáng (vd: dim moonlight, flickering candles, shadows)",
  "soundSuggestion": "Gợi ý âm thanh (vd: creaking door, whispers, ambient horror)"
}

Hãy phân tích kịch bản và tạo prompt tối ưu cho video kinh dị/bí ẩn 5 giây.`;

    const userPrompt = `Kịch bản cần chuyển đổi:\n\n${script}\n\nHãy tạo prompt JSON theo định dạng yêu cầu.`;
    
    // Try multiple models automatically (FREE & PAID compatible)
    // If we already found a working model, use it. Otherwise try all models.
    const modelsToTry = (window as any).__workingGeminiModel 
      ? [(window as any).__workingGeminiModel]
      : [
          // === FREE TIER MODELS (Try first for compatibility) ===
          'gemini-1.5-flash',              // FREE - Fast
          'gemini-1.5-pro',                // FREE - Quality
          'gemini-pro',                    // FREE - Legacy
          
          // === PAID/EXPERIMENTAL MODELS (Better quality if available) ===
          'gemini-2.0-flash-exp',          // PAID - Faster, experimental
          'models/gemini-2.0-flash-exp',
          
          // === WITH PREFIX VARIANTS ===
          'models/gemini-1.5-flash',
          'models/gemini-1.5-pro',
          'models/gemini-pro',
          'models/gemini-1.5-flash-latest',
          'models/gemini-1.5-pro-latest'
        ];
    
    console.log('📝 [PROMPT] Will try models:', modelsToTry);
    
    for (const workingModel of modelsToTry) {
      console.log(`🔄 [PROMPT] Trying model: ${workingModel}`);
      
      try {
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
          console.log(`❌ [PROMPT] Model ${workingModel} failed:`, errorData.error?.message);
          
          // Try next model
          continue;
        }
        
        // Success!
        console.log(`✅ [PROMPT] Success with model: ${workingModel}`);
        (window as any).__workingGeminiModel = workingModel;
        
        const data = await apiResponse.json();
        let text = data.candidates[0]?.content?.parts[0]?.text || '';
        
        // Clean up response - remove markdown code blocks if present
        text = text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
        
        // Parse JSON
        let jsonData;
        try {
          jsonData = JSON.parse(text);
        } catch (e) {
          // If JSON parsing fails, try to extract JSON from text
          const jsonMatch = text.match(/\{[\s\S]*\}/);
          if (jsonMatch) {
            jsonData = JSON.parse(jsonMatch[0]);
          } else {
            throw new Error('Không thể parse JSON từ response');
          }
        }
        
        // Create PromptResult
        const promptResult: PromptResult = {
          prompt: jsonData.prompt || '',
          duration: jsonData.duration || 5,
          style: jsonData.style || 'cinematic horror',
          mood: jsonData.mood || 'eerie',
          camera: jsonData.camera || 'slow zoom',
          lighting: jsonData.lighting || 'dim shadows',
          soundSuggestion: jsonData.soundSuggestion || 'ambient horror',
          fullJson: JSON.stringify(jsonData, null, 2)
        };
        
        return promptResult;
        
      } catch (error: any) {
        console.log(`❌ [PROMPT] Model ${workingModel} error:`, error.message);
        // Try next model
        continue;
      }
    }
    
    // All models failed
    throw new Error('Tất cả models đều thất bại. Vui lòng kiểm tra API key hoặc thử lại sau.');
    
  } catch (error: any) {
    console.error('Generate prompt error:', error);
    
    if (error.message?.includes('quota')) {
      throw new Error('API đã hết quota. Vui lòng đợi hoặc sử dụng API key khác.');
    }
    
    if (error.message?.includes('API_KEY_INVALID')) {
      throw new Error('API Key không hợp lệ. Vui lòng kiểm tra lại.');
    }
    
    throw new Error(`Lỗi khi tạo prompt: ${error.message || 'Unknown error'}`);
  }
}
