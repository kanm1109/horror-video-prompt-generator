import { Scene, TimelineExport } from '../types/longScript'

/**
 * Export scenes to timeline format for video editors
 */
export function exportToTimeline(
  scenes: Scene[],
  projectName: string = 'Horror Video Project'
): TimelineExport {
  return {
    version: '1.0',
    projectName,
    totalDuration: scenes.length > 0 ? scenes[scenes.length - 1].endTime : 0,
    scenes: scenes.map(scene => ({
      sceneNumber: scene.sceneNumber,
      startTime: scene.startTime,
      endTime: scene.endTime,
      duration: scene.duration,
      prompt: scene.prompt?.prompt || '',
      style: scene.prompt?.style || '',
      mood: scene.prompt?.mood || '',
      camera: scene.prompt?.camera || '',
      lighting: scene.prompt?.lighting || '',
      sound: scene.prompt?.soundSuggestion || ''
    }))
  };
}

/**
 * Download timeline as JSON file
 */
export function downloadTimeline(timeline: TimelineExport) {
  const blob = new Blob([JSON.stringify(timeline, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${timeline.projectName.replace(/\s+/g, '_')}_timeline_${Date.now()}.json`;
  a.click();
  URL.revokeObjectURL(url);
}

/**
 * Export to CSV for spreadsheet editing
 */
export function exportToCSV(scenes: Scene[]): string {
  const headers = ['Scene', 'Start', 'End', 'Duration', 'Script', 'Prompt', 'Style', 'Mood', 'Camera', 'Lighting', 'Sound'];
  
  const rows = scenes.map(scene => [
    scene.sceneNumber,
    scene.startTime,
    scene.endTime,
    scene.duration,
    `"${scene.scriptText.replace(/"/g, '""')}"`,
    `"${scene.prompt?.prompt?.replace(/"/g, '""') || ''}"`,
    scene.prompt?.style || '',
    scene.prompt?.mood || '',
    scene.prompt?.camera || '',
    scene.prompt?.lighting || '',
    scene.prompt?.soundSuggestion || ''
  ]);

  return [headers, ...rows].map(row => row.join(',')).join('\n');
}

/**
 * Download CSV file
 */
export function downloadCSV(scenes: Scene[], projectName: string = 'project') {
  const csv = exportToCSV(scenes);
  const blob = new Blob([csv], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${projectName.replace(/\s+/g, '_')}_scenes_${Date.now()}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}

/**
 * Format time as MM:SS
 */
function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}

/**
 * Export to TXT format with JSON objects per scene
 * Each scene's prompt data is in one line as JSON for easy copy-paste
 */
export function exportToTXT(scenes: Scene[], projectName: string = 'Horror Video Project'): string {
  const totalDuration = scenes.length > 0 ? scenes[scenes.length - 1].endTime : 0;
  const lines: string[] = [];
  
  // Header
  lines.push('============================================');
  lines.push(projectName);
  lines.push(`Tổng số scenes: ${scenes.length}`);
  lines.push(`Thời lượng: ${formatTime(totalDuration)}`);
  lines.push('============================================');
  lines.push('');
  
  // Each scene with JSON object
  scenes.forEach((scene) => {
    lines.push(`--- Scene ${scene.sceneNumber} (${formatTime(scene.startTime)} - ${formatTime(scene.endTime)}) ---`);
    
    // Create JSON object for easy copy
    const jsonObject = {
      prompt: scene.prompt?.prompt || '',
      style: scene.prompt?.style || '',
      mood: scene.prompt?.mood || '',
      camera: scene.prompt?.camera || '',
      lighting: scene.prompt?.lighting || ''
    };
    
    lines.push(JSON.stringify(jsonObject));
    lines.push('');
  });
  
  lines.push('============================================');
  
  return lines.join('\n');
}

/**
 * Download TXT file
 */
export function downloadTXT(scenes: Scene[], projectName: string = 'Horror Video Project') {
  const txt = exportToTXT(scenes, projectName);
  const blob = new Blob([txt], { type: 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${projectName.replace(/\s+/g, '_')}_prompts_${Date.now()}.txt`;
  a.click();
  URL.revokeObjectURL(url);
}

/**
 * Save full project state to file
 */
export function saveProject(
  projectName: string,
  fullScript: string,
  scenes: Scene[],
  sceneDuration: number,
  readingSpeed: string
) {
  const projectData = {
    version: '1.0',
    savedAt: new Date().toISOString(),
    projectName,
    fullScript,
    scenes,
    settings: {
      sceneDuration,
      readingSpeed
    },
    stats: {
      totalScenes: scenes.length,
      generatedCount: scenes.filter(s => s.prompt).length,
      totalDuration: scenes.length > 0 ? scenes[scenes.length - 1].endTime : 0,
      scriptLength: fullScript.length
    }
  };

  const json = JSON.stringify(projectData, null, 2);
  const blob = new Blob([json], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${projectName.replace(/\s+/g, '_')}_project_${Date.now()}.json`;
  a.click();
  URL.revokeObjectURL(url);
}

/**
 * Load project from file
 */
export function loadProjectFromFile(
  file: File,
  onSuccess: (data: any) => void,
  onError: (error: string) => void
) {
  const reader = new FileReader();
  
  reader.onload = (e) => {
    try {
      const content = e.target?.result as string;
      const projectData = JSON.parse(content);
      
      // Validate project structure
      if (!projectData.version || !projectData.scenes) {
        throw new Error('File không hợp lệ! Thiếu dữ liệu project.');
      }
      
      onSuccess(projectData);
    } catch (err: any) {
      onError(`Lỗi đọc file: ${err.message}`);
    }
  };
  
  reader.onerror = () => {
    onError('Lỗi khi đọc file!');
  };
  
  reader.readAsText(file);
}
