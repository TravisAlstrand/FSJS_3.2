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

/* ================== T-SHIRT SECTION ================== */

const designSelect = document.querySelector('#design');
const colorSelect = document.querySelector('#color');
const colorOptions = document.querySelectorAll('[data-theme]');
colorSelect.disabled = true;

designSelect.addEventListener('change', () => {
  colorSelect.disabled = false;

  if (designSelect.value === 'js puns') {
    colorOptions[0].selected = true;

    colorOptions.forEach(option => {
      if (option.getAttribute(['data-theme']) === 'heart js') {
        option.hidden = true;
      } else {
        option.hidden = false;
      };
    });
  } else {
    colorOptions[3].selected = true;

    colorOptions.forEach(option => {
      if (option.getAttribute(['data-theme']) === 'js puns') {
        option.hidden = true;
      } else {
        option.hidden = false;
      };
    });
  }
});

/* ================== ACTIVITIES SECTION ================== */

const activitiesFieldset = document.querySelector('#activities');
const totalCostDisplay = document.querySelector('#activities-cost');
const datedActivityCheckboxes = document.querySelectorAll('[data-day-and-time]');
let totalCost = 0;

activitiesFieldset.addEventListener('change', (e) => {
  // UPDATE TOTAL COST
  const activityCost = parseInt(e.target.getAttribute(['data-cost']));
  
  if (e.target.checked) {
    totalCost += activityCost;
  } else {
    totalCost -= activityCost;
  };
  totalCostDisplay.innerHTML = `Total: $${totalCost}`;

  // PREVENT SAME DAY/TIME
  if (e.target.hasAttribute(['data-day-and-time'])) {
    const selectedDayAndTime = e.target.getAttribute(['data-day-and-time']);
    
    if (e.target.checked) {
      datedActivityCheckboxes.forEach(activity => {
        const dayAndTime = activity.getAttribute(['data-day-and-time']);
        
        if (!activity.checked && dayAndTime === selectedDayAndTime) {
          activity.disabled = true;
          activity.parentElement.className = 'disabled';
        }
      });
    } else {
      datedActivityCheckboxes.forEach(activity => {
        const dayAndTime = activity.getAttribute(['data-day-and-time']);
        
        if (dayAndTime === selectedDayAndTime) {
          activity.disabled = false;
          activity.parentElement.className = '';
        }
      });
    };
  };
});