// scripts/datafetch.js

export async function loadProjects() {
  try {
    const response = await fetch('data/projects.json');
    if (!response.ok) throw new Error(`HTTP Error: ${response.status}`);

    const json = await response.json();
    return json.projects; // <-- matches "projects" array in JSON
  } catch (err) {
    console.error("Failed to load project data:", err);
    return []; // fail-safe return
  }
}
