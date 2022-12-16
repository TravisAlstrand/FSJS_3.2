/* ================== NAME FIELD ================== */

const nameField = document.querySelector('#name');
nameField.focus();

/* ================== JOB ROLE FIELD ================== */

const jobSelect = document.querySelector('#title');
const otherJobField = document.querySelector('#other-job-role');
otherJobField.classList.add('hidden');

jobSelect.addEventListener('change', () => {
  if (jobSelect.value === 'other') {
    otherJobField.classList.remove('hidden');
  } else {
    otherJobField.classList.add('hidden');
  }
});
