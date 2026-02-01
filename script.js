// Theme Management
function toggleTheme() {
  const body = document.body;
  const currentTheme = body.getAttribute('data-theme');
  const newTheme = currentTheme === 'light' ? 'dark' : 'light';
  body.setAttribute('data-theme', newTheme);

  const themeBtn = document.querySelector('.theme-toggle i');
  themeBtn.className = newTheme === 'light' ? 'fas fa-moon' : 'fas fa-sun';
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
}

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
    window.location.reload();
  }
}

// Initialize with some placeholders or empty
window.onload = updatePreview;