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
const activitiesArray = document.querySelectorAll('[type="checkbox"]');
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

// LISTEN FOR FOCUS
activitiesArray.forEach(activity => {

  activity.addEventListener('focus', () => {
    activity.parentElement.classList.add('focus');
  });

  activity.addEventListener('blur', () => {
    activity.parentElement.classList.remove('focus'); 
  });
});

/* ================== PAYMENT SECTION ================== */

const paymentSelect = document.querySelector('#payment');
const paymentOptions = paymentSelect.children;
const payCredit = document.querySelector('#credit-card');
const payPaypal = document.querySelector('#paypal');
const payBitcoin = document.querySelector('#bitcoin');
const paymentDivs = [payCredit, payPaypal, payBitcoin];

payPaypal.classList.add('hidden');
payBitcoin.classList.add('hidden');

paymentSelect.addEventListener('change', () => {

  paymentDivs.forEach(div => {
    if (paymentSelect.value === div.id) {
      div.classList.remove('hidden');
    } else {
      div.classList.add('hidden');
    }
  });
});

/* ================== VALIDATION ================== */

const errorMsgs = document.querySelectorAll('.hint');

errorMsgs.forEach(msg => {
  msg.classList.add('hidden');
});

const validateInput = (input, valid) => {
  const parent = input.parentElement;
  if (valid) {
    parent.classList.remove('not-valid');
    parent.classList.add('valid');
    parent.lastElementChild.classList.add('hidden');
  } else {
    parent.classList.add('not-valid');
    parent.classList.remove('valid');
    parent.lastElementChild.classList.remove('hidden');
  }
};

const validateActivities = (valid) => {
  if (valid) {
    activitiesFieldset.classList.remove('not-valid');
    activitiesFieldset.classList.add('valid');
    activitiesFieldset.lastElementChild.classList.add('hidden');
  } else {
    activitiesFieldset.classList.add('not-valid');
    activitiesFieldset.classList.remove('valid');
    activitiesFieldset.lastElementChild.classList.remove('hidden');
  };
};

const checkRegex = (input, value) => {
  if (input === 'name') {
    return /^[a-z]+[\s]?[a-z]+?$/i.test(value);
  } else if (input === 'email') {
    return /^[^@]+@[^@.]+\.[a-z]+$/i.test(value);
  } else if (input === 'ccNum') {
    return /^(\d{13,16})$/.test(value);
  } else if (input === 'ccZip') {
    return /^(\d{5})$/.test(value);
  } else if (input === 'ccCvv') {
    return /^(\d{3})$/.test(value);
  }
};

/* ================== SUBMIT ================== */

const form = document.querySelector('form');
const emailField = document.querySelector('#email');
const ccNumField = document.querySelector('#cc-num');
const ccZipField = document.querySelector('#zip');
const ccCvvField = document.querySelector('#cvv');

form.addEventListener('submit', (e) => {

  let checkedFields = [];
  let invalidFields = 0;

  // NAME / EMAIL
  const nameValid = checkRegex('name', nameField.value);
  const emailValid = checkRegex('email', emailField.value);
  validateInput(nameField, nameValid);
  validateInput(emailField, emailValid);

  // ACTIVITIES
  let activitiesValid;
  if (totalCost > 0) {
    validateActivities(true);
    activitiesValid = true;
  } else {
    validateActivities(false);
    activitiesValid = false;
  };
  checkedFields.push(nameValid, emailValid, activitiesValid);

  // PAYMENT
  if (paymentSelect.value === 'credit-card' || paymentSelect.value === 'select method') {
    const ccNumValid = checkRegex('ccNum', ccNumField.value);
    const ccZipValid = checkRegex('ccZip', ccZipField.value);
    const ccCvvValid = checkRegex('ccCvv', ccCvvField.value);
    checkedFields.push(ccNumValid, ccZipValid, ccCvvValid);
    validateInput(ccNumField, ccNumValid);
    validateInput(ccZipField, ccZipValid);
    validateInput(ccCvvField, ccCvvValid);
  };

  checkedFields.forEach(checked => {
    if (!checked) {
      invalidFields++;
    };
  });

  if (invalidFields > 0) {
    e.preventDefault();
  };
});

/* ================== REAL TIME / CONDITIONAL VALIDATION ================== */

// LISTEN FOR EMAIL TYPING
emailField.addEventListener('keyup', () => {

  const userInput = emailField.value;
    
  const emailValid = checkRegex('email', emailField.value);
  validateInput(emailField, emailValid);

  if (userInput === '') {
    emailField.parentElement.lastElementChild.innerHTML = 'Email field cannot be blank';
  } else if (!emailValid) {
    emailField.parentElement.lastElementChild.innerHTML = 'Email must be formatted correctly. Ex: "john@example.com".'
  }
});