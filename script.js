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

function changeFont(fontClass) {
  const paper = document.getElementById('resumePaper');
  paper.classList.remove('font-modern', 'font-classic', 'font-elegant');
  paper.classList.add(fontClass);
  saveToLocalStorage();
}

function changeTemplate(type) {
  const container = document.querySelector('.resume-container');
  const sidebar = document.querySelector('.sidebar');
  if (type === 'modern') {
    container.style.display = 'block';
    sidebar.style.width = '100%';
    sidebar.style.padding = '1.5rem';
    document.querySelector('.main-content').style.padding = '1.5rem';
    document.getElementById('qrCodeContainer').style.position = 'absolute';
  } else {
    container.style.display = 'grid';
    container.style.gridTemplateColumns = '30% 70%';
    sidebar.style.width = '';
    document.getElementById('qrCodeContainer').style.position = 'static';
  }
  saveToLocalStorage();
}

// Field Management
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

function addRankedSkill() {
  const container = document.getElementById('rankedSkillsContainer');
  const div = document.createElement('div');
  div.className = 'skill-entry mb-2';
  div.innerHTML = `
        <input type="text" class="skillName" placeholder="Skill" oninput="updatePreview()" style="flex:2">
        <input type="range" class="skillLevel" min="20" max="100" value="80" oninput="updatePreview()" style="flex:1">
    `;
  container.appendChild(div);
}

function addAward() {
  const container = document.getElementById('awardContainer');
  const div = document.createElement('div');
  div.className = 'award-entry mb-2';
  div.innerHTML = `<input type="text" class="awardTitle" placeholder="Achievement Name" oninput="updatePreview()">`;
  container.appendChild(div);
}

function addLanguage() {
  const container = document.getElementById('langContainer');
  const div = document.createElement('div');
  div.className = 'lang-entry mb-2';
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

// AI ATS Engine
const ATS_DATABASE = {
  "developer": ["GitHub", "API Integration", "Scalability", "Unit Testing", "React", "Node.js", "Docker", "Agile"],
  "design": ["Figma", "User Research", "Wireframing", "Prototyping", "Design Systems", "Accessibility", "Adobe XD"],
  "manager": ["Stakeholder Management", "Agile Methodology", "Budgeting", "Product Roadmap", "Risk Mitigation", "Jira"],
  "default": ["Problem Solving", "Collaboration", "Communication", "Time Management", "Critical Thinking"]
};

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

function updateATS() {
  const title = (document.getElementById('titleIn').value || "").toLowerCase();
  let keywords = ATS_DATABASE.default;
  if (title.includes("dev")) keywords = ATS_DATABASE.developer;
  else if (title.includes("design")) keywords = ATS_DATABASE.design;
  else if (title.includes("manag")) keywords = ATS_DATABASE.manager;

  const container = document.getElementById('atsKeywords');
  if (container) {
    container.innerHTML = keywords.map(k => `<span class="keyword-tag" onclick="addSkillFromATS('${k}')">${k}</span>`).join('');
  }
}

function addSkillFromATS(skill) {
  addRankedSkill();
  const entries = document.querySelectorAll('.skill-entry');
  const lastEntry = entries[entries.length - 1];
  lastEntry.querySelector('.skillName').value = skill;
  updatePreview();
}

// QR Generation
function updateQR() {
  const url = document.getElementById('qrIn').value;
  const qrImg = document.getElementById('qrImage');
  if (url && qrImg) {
    qrImg.src = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(url)}`;
    qrImg.style.display = 'block';
  } else if (qrImg) {
    qrImg.style.display = 'none';
  }
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

  // Achievements
  const awardEntries = document.querySelectorAll('.awardTitle');
  let awardHtml = '<ul>';
  awardEntries.forEach(input => {
    if (input.value) awardHtml += `<li>${input.value}</li>`;
  });
  document.getElementById('awardOut').innerHTML = awardHtml + '</ul>';

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

  // Ranked Skills
  const skillEntries = document.querySelectorAll('.skill-entry');
  let skillsHtml = '';
  skillEntries.forEach(entry => {
    const name = entry.querySelector('.skillName').value;
    const level = entry.querySelector('.skillLevel').value;
    if (name) {
      skillsHtml += `
                <div style="margin-bottom: 10px;">
                    <div style="display:flex; justify-content:between; font-size:0.8rem;">
                        <span>${name}</span>
                    </div>
                    <div class="skill-bar-container">
                        <div class="skill-bar-fill" style="width: ${level}%"></div>
                    </div>
                </div>
            `;
    }
  });
  document.getElementById('skillsOut').innerHTML = skillsHtml;

  updateQR();
  updateATS();
  calculateStrength();
  saveToLocalStorage();
}

function calculateStrength() {
  let strength = 0;
  const fields = ['nameIn', 'titleIn', 'emailIn', 'conIn', 'addIn', 'objectiveIn'];
  fields.forEach(f => {
    const el = document.getElementById(f);
    if (el && el.value.length > 5) strength += 10;
  });

  if (document.querySelectorAll('.experience-entry').length > 1) strength += 10;
  if (document.querySelectorAll('.project-entry').length > 1) strength += 10;
  if (document.querySelectorAll('.skill-entry').length > 2) strength += 10;
  if (document.getElementById('qrIn') && document.getElementById('qrIn').value) strength += 10;

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
      qr: document.getElementById('qrIn') ? document.getElementById('qrIn').value : ''
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
    if (document.getElementById('qrIn')) document.getElementById('qrIn').value = data.personal.qr || '';

    if (data.theme && data.theme.color) {
      const themeColorInput = document.getElementById('themeColor');
      if (themeColorInput) {
        themeColorInput.value = data.theme.color;
        changeThemeColor(data.theme.color);
      }
    }
    updatePreview();
  }
}

window.addEventListener('load', loadFromLocalStorage);

// Image Handling
const fileInput = document.getElementById('file');
if (fileInput) {
  fileInput.addEventListener('change', function () {
    const reader = new FileReader();
    const profileOut = document.getElementById('profileOut');
    const userPlaceholder = document.getElementById('userPlaceholder');
    reader.onload = function () {
      if (profileOut) {
        profileOut.src = reader.result;
        profileOut.style.display = 'block';
      }
      if (userPlaceholder) userPlaceholder.style.display = 'none';
    }
    if (this.files[0]) {
      reader.readAsDataURL(this.files[0]);
    }
  });
}

function downloadPDF() {
  const element = document.getElementById('resumePaper');
  const body = document.body;

  // Clone the element
  const clone = element.cloneNode(true);

  // Create a visible container for the clone to ensure capturing works on all devices
  // We place it on top of the current view (z-index high) but transparent to user interaction if possible?
  // Actually, showing it for a split second is better than it failing.
  // We'll use a white background to cover the app while generating.
  const container = document.createElement('div');
  Object.assign(container.style, {
    position: 'fixed',
    top: '0',
    left: '0',
    width: '100vw',
    height: '100vh',
    zIndex: '99999',
    background: '#333', // Dark background to focus on the paper
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
    overflow: 'auto',
    padding: '20px'
  });

  // Style the clone to enforce A4 dimensions without scaling
  Object.assign(clone.style, {
    transform: 'none',
    width: '794px',
    minHeight: '1123px',
    height: 'auto',
    margin: '0 auto',
    boxShadow: 'none',
    background: 'white',
    position: 'relative' // Ensure it flows correctly in container
  });

  // Add a 'generating' loading text
  const loading = document.createElement('div');
  loading.innerText = 'Generating PDF... Please wait.';
  Object.assign(loading.style, {
    position: 'fixed',
    top: '10px',
    left: '50%',
    transform: 'translateX(-50%)',
    color: 'white',
    zIndex: '100000',
    fontFamily: 'sans-serif',
    background: 'rgba(0,0,0,0.8)',
    padding: '10px 20px',
    borderRadius: '5px'
  });

  container.appendChild(clone);
  body.appendChild(container);
  body.appendChild(loading);

  const opt = {
    margin: 0, // No margin to avoid extra pages
    filename: 'resume.pdf',
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: {
      scale: 2,
      useCORS: true,
      scrollY: 0,
      windowWidth: 794 // Match the A4 width
    },
    jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
    pagebreak: { mode: 'avoid-all' } // Avoid breaking elements awkwardly
  };

  // Wait a brief moment to ensure styles are applied and fonts rendered
  setTimeout(() => {
    html2pdf().set(opt).from(clone).save().then(() => {
      body.removeChild(container);
      body.removeChild(loading);
    }).catch(err => {
      console.error("PDF generation error:", err);
      if (body.contains(container)) body.removeChild(container);
      if (body.contains(loading)) body.removeChild(loading);
      alert("Error generating PDF. Please try again.");
    });
  }, 500); // 500ms delay
}

function resetForm() {
  if (confirm('Are you sure you want to reset all data?')) {
    localStorage.removeItem('resumeData');
    window.location.reload();
  }
}

window.onload = updatePreview;