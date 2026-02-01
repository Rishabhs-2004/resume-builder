// Theme & Template Management
function toggleTheme() {
  const body = document.body;
  const currentTheme = body.getAttribute('data-theme');
  const newTheme = currentTheme === 'light' ? 'dark' : 'light';
  body.setAttribute('data-theme', newTheme);

  const themeBtn = document.querySelector('.theme-toggle i');
  themeBtn.className = newTheme === 'light' ? 'fas fa-moon' : 'fas fa-sun';
}

function changeThemeColor(color) {
  document.documentElement.style.setProperty('--primary-color', color);
  saveToLocalStorage();
}

function changeTemplate(type) {
  const container = document.querySelector('.resume-container');
  if (type === 'modern') {
    container.style.display = 'block';
    document.querySelector('.sidebar').style.width = '100%';
    document.querySelector('.sidebar').style.padding = '1.5rem';
    document.querySelector('.main-content').style.padding = '1.5rem';
  } else {
    container.style.display = 'grid';
    container.style.gridTemplateColumns = '30% 70%';
    document.querySelector('.sidebar').style.width = '';
  }
  saveToLocalStorage();
}

// Dynamic Field Management
function addExperience() {
  const container = document.getElementById('weContainer');
  const div = document.createElement('div');
  div.className = 'experience-entry mb-3 mt-3 pt-3 border-top';
  div.innerHTML = `
        <div class="grid-2">
            <input type="text" class="weTitle mb-2" placeholder="Job Title" oninput="updatePreview()">
            <input type="text" class="weCompany mb-2" placeholder="Company" oninput="updatePreview()">
        </div>
        <input type="text" class="weDate mb-2" placeholder="Duration (e.g. 2020 - Present)" oninput="updatePreview()">
        <textarea class="weDesc" rows="2" placeholder="Responsibilities and achievements..." oninput="updatePreview()"></textarea>
    `;
  container.appendChild(div);
}

function addEducation() {
  const container = document.getElementById('eduContainer');
  const div = document.createElement('div');
  div.className = 'education-entry mb-3 mt-3 pt-3 border-top';
  div.innerHTML = `
        <div class="grid-2">
            <input type="text" class="eduDegree mb-2" placeholder="Degree / Course" oninput="updatePreview()">
            <input type="text" class="eduSchool mb-2" placeholder="University / School" oninput="updatePreview()">
        </div>
        <input type="text" class="eduDate mb-2" placeholder="Year (e.g. 2016 - 2020)" oninput="updatePreview()">
    `;
  container.appendChild(div);
}

function addProject() {
  const container = document.getElementById('projectContainer');
  const div = document.createElement('div');
  div.className = 'project-entry mb-3 mt-3 pt-3 border-top';
  div.innerHTML = `
        <input type="text" class="projectTitle mb-2" placeholder="Project Name" oninput="updatePreview()">
        <input type="text" class="projectLink mb-2" placeholder="Project Link (Optional)" oninput="updatePreview()">
        <textarea class="projectDesc" rows="2" placeholder="What did you build?" oninput="updatePreview()"></textarea>
    `;
  container.appendChild(div);
}

function addLanguage() {
  const container = document.getElementById('langContainer');
  const div = document.createElement('div');
  div.className = 'lang-entry mb-2';
  div.style.display = 'flex';
  div.style.gap = '10px';
  div.innerHTML = `
        <input type="text" class="langName" placeholder="Language" oninput="updatePreview()">
        <select class="langLevel" oninput="updatePreview()" style="width: 120px; padding: 0.5rem; border-radius: 8px; border: 1.5px solid var(--border-color); background: transparent; color: var(--text-main);">
              <option value="Native">Native</option>
              <option value="Fluent">Fluent</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Basic">Basic</option>
        </select>
    `;
  container.appendChild(div);
}

const AI_SUMMARIES = {
  "default": "A highly motivated and detail-oriented professional with a strong foundation in problem-solving and a passion for continuous learning. Seeking to leverage skills in a challenging environment to drive innovation and growth.",
  "developer": "Passionate Software Developer with expertise in modern web technologies. Experienced in building scalable applications, optimizing performance, and collaborating in agile teams to deliver high-quality software solutions.",
  "designer": "Creative UI/UX Designer dedicated to crafting intuitive and visually stunning user experiences. Skilled in user research, wireframing, and creating pixel-perfect designs that align with business goals.",
  "manager": "Results-driven Project Manager with a proven trackable record of leading cross-functional teams and delivering complex projects on time and within budget. Strong focus on process improvement and stakeholder management."
};

function aiSuggestSummary() {
  const title = (document.getElementById('titleIn').value || "").toLowerCase();
  let suggestion = AI_SUMMARIES.default;

  if (title.includes("dev") || title.includes("soft")) suggestion = AI_SUMMARIES.developer;
  else if (title.includes("design") || title.includes("art")) suggestion = AI_SUMMARIES.designer;
  else if (title.includes("manag") || title.includes("lead")) suggestion = AI_SUMMARIES.manager;

  document.getElementById('objectiveIn').value = suggestion;
  updatePreview();

  const btn = document.querySelector('[onclick="aiSuggestSummary()"]');
  const originalText = btn.innerHTML;
  btn.innerHTML = '<i class="fas fa-check"></i> Improved!';
  btn.style.borderColor = 'var(--primary-color)';
  setTimeout(() => { btn.innerHTML = originalText; btn.style.borderColor = ''; }, 2000);
}

// Live Preview Logic
function updatePreview() {
  // Personal Info
  document.getElementById('nameOut').innerText = document.getElementById('nameIn').value || 'Your Name';
  document.getElementById('titleOut').innerText = document.getElementById('titleIn').value || 'Professional Title';
  document.getElementById('emailOut').innerText = document.getElementById('emailIn').value ? '📧 ' + document.getElementById('emailIn').value : '';
  document.getElementById('phoneOut').innerText = document.getElementById('conIn').value ? '📞 ' + document.getElementById('conIn').value : '';
  document.getElementById('addressOut').innerText = document.getElementById('addIn').value ? '📍 ' + document.getElementById('addIn').value : '';

  // Links
  document.getElementById('linOut').innerText = document.getElementById('linIn').value ? '🔗 LinkedIn' : '';
  document.getElementById('siteOut').innerText = document.getElementById('siteIn').value ? '🌐 Portfolio' : '';

  // Objective
  document.getElementById('objectiveOut').innerText = document.getElementById('objectiveIn').value;

  // Projects
  const projectEntries = document.querySelectorAll('.project-entry');
  let projectHtml = '';
  projectEntries.forEach(entry => {
    const title = entry.querySelector('.projectTitle').value;
    const link = entry.querySelector('.projectLink').value;
    const desc = entry.querySelector('.projectDesc').value;
    if (title) {
      projectHtml += `
                <div class="experience-item">
                    <div class="item-header">
                        <span class="item-title">${title}</span>
                        ${link ? `<a href="${link}" target="_blank" style="font-size:0.8rem; color:var(--primary-color);">View <i class="fas fa-external-link-alt"></i></a>` : ''}
                    </div>
                    <p class="item-desc">${desc}</p>
                </div>
            `;
    }
  });
  document.getElementById('projectOut').innerHTML = projectHtml;

  // Work Experience
  const weEntries = document.querySelectorAll('.experience-entry');
  let weHtml = '';
  weEntries.forEach(entry => {
    const title = entry.querySelector('.weTitle').value;
    const company = entry.querySelector('.weCompany').value;
    const date = entry.querySelector('.weDate').value;
    const desc = entry.querySelector('.weDesc').value;
    if (title || company) {
      weHtml += `
                <div class="experience-item">
                    <div class="item-header">
                        <span class="item-title">${title}${company ? ' @ ' + company : ''}</span>
                        <span class="item-date">${date}</span>
                    </div>
                    <p class="item-desc">${desc}</p>
                </div>
            `;
    }
  });
  document.getElementById('weOut').innerHTML = weHtml;

  // Education
  const eduEntries = document.querySelectorAll('.education-entry');
  let eduHtml = '';
  eduEntries.forEach(entry => {
    const degree = entry.querySelector('.eduDegree').value;
    const school = entry.querySelector('.eduSchool').value;
    const date = entry.querySelector('.eduDate').value;
    if (degree || school) {
      eduHtml += `
                <div class="education-item">
                    <div class="item-header">
                        <span class="item-title">${degree}</span>
                        <span class="item-date">${date}</span>
                    </div>
                    <div class="item-desc">${school}</div>
                </div>
            `;
    }
  });
  document.getElementById('eduOut').innerHTML = eduHtml;

  // Languages
  const langEntries = document.querySelectorAll('.lang-entry');
  let langHtml = '';
  langEntries.forEach(entry => {
    const name = entry.querySelector('.langName').value;
    const level = entry.querySelector('.langLevel').value;
    if (name) {
      langHtml += `<p style="font-size: 0.8rem; margin-bottom: 2px;"><strong>${name}:</strong> <span style="opacity: 0.8">${level}</span></p>`;
    }
  });
  document.getElementById('langOut').innerHTML = langHtml;

  // Skills
  const skillsIn = document.getElementById('skillsIn').value;
  if (skillsIn) {
    const skills = skillsIn.split(',').map(s => s.trim()).filter(s => s !== '');
    document.getElementById('skillsOut').innerHTML = skills.map(skill =>
      `<span style="display:inline-block; background:rgba(255,255,255,0.1); padding: 2px 8px; border-radius:4px; margin: 2px; font-size: 0.8rem;">${skill}</span>`
    ).join(' ');
  } else {
    document.getElementById('skillsOut').innerHTML = '';
  }

  calculateStrength();
  saveToLocalStorage();
}

function calculateStrength() {
  let strength = 0;
  const fields = ['nameIn', 'titleIn', 'emailIn', 'conIn', 'addIn', 'objectiveIn', 'skillsIn'];
  fields.forEach(f => {
    if (document.getElementById(f) && document.getElementById(f).value.length > 5) strength += 10;
  });
  if (document.querySelectorAll('.experience-entry').length > 1) strength += 15;
  if (document.querySelectorAll('.project-entry').length > 1) strength += 15;
  strength = Math.min(strength, 100);
  const bar = document.getElementById('strengthBar');
  const text = document.getElementById('strengthText');
  if (bar && text) {
    bar.style.width = strength + '%';
    text.innerText = strength + '% Strength';
    if (strength < 40) bar.style.background = '#ef4444';
    else if (strength < 70) bar.style.background = '#f59e0b';
    else bar.style.background = '#22c55e';
  }
}

// Global Storage Logic
function saveToLocalStorage() {
  const data = {
    personal: {
      name: document.getElementById('nameIn').value,
      title: document.getElementById('titleIn').value,
      email: document.getElementById('emailIn').value,
      phone: document.getElementById('conIn').value,
      address: document.getElementById('addIn').value,
      lin: document.getElementById('linIn').value,
      site: document.getElementById('siteIn').value,
      objective: document.getElementById('objectiveIn').value,
      skills: document.getElementById('skillsIn').value,
    },
    theme: {
      color: document.getElementById('themeColor').value
    }
  };
  localStorage.setItem('resumeData', JSON.stringify(data));
}

function loadFromLocalStorage() {
  const saved = localStorage.getItem('resumeData');
  if (saved) {
    const data = JSON.parse(saved);
    if (document.getElementById('nameIn')) document.getElementById('nameIn').value = data.personal.name || '';
    if (document.getElementById('titleIn')) document.getElementById('titleIn').value = data.personal.title || '';
    if (document.getElementById('emailIn')) document.getElementById('emailIn').value = data.personal.email || '';
    if (document.getElementById('conIn')) document.getElementById('conIn').value = data.personal.phone || '';
    if (document.getElementById('addIn')) document.getElementById('addIn').value = data.personal.address || '';
    if (document.getElementById('linIn')) document.getElementById('linIn').value = data.personal.lin || '';
    if (document.getElementById('siteIn')) document.getElementById('siteIn').value = data.personal.site || '';
    if (document.getElementById('objectiveIn')) document.getElementById('objectiveIn').value = data.personal.objective || '';
    if (document.getElementById('skillsIn')) document.getElementById('skillsIn').value = data.personal.skills || '';

    if (data.theme && data.theme.color) {
      document.getElementById('themeColor').value = data.theme.color;
      changeThemeColor(data.theme.color);
    }
    updatePreview();
  }
}

window.addEventListener('load', loadFromLocalStorage);

// Image Handling
document.getElementById('file').addEventListener('change', function () {
  const reader = new FileReader();
  const profileOut = document.getElementById('profileOut');
  const userPlaceholder = document.getElementById('userPlaceholder');
  reader.onload = function () {
    profileOut.src = reader.result;
    profileOut.style.display = 'block';
    if (userPlaceholder) userPlaceholder.style.display = 'none';
  }
  if (this.files[0]) {
    reader.readAsDataURL(this.files[0]);
  }
});

function downloadPDF() {
  const element = document.getElementById('resumePaper');
  const opt = {
    margin: 0,
    filename: 'resume.pdf',
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 2 },
    jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
  };
  html2pdf().set(opt).from(element).save();
}

function resetForm() {
  if (confirm('Are you sure you want to reset all data?')) {
    localStorage.removeItem('resumeData');
    window.location.reload();
  }
}

window.onload = updatePreview;