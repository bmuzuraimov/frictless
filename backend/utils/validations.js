const validateEventFields = (course) => {
    let errors = [];
    if (!course.title || !course.organizer || isNaN(course.datetime) || !course.location || !course.description) {
        errors.push('Please fill in all required fields.');
    }
    if (course.quota <= 0) {
        errors.push('Quota should be a positive number.');
    }
    if (course.image && !/^https?:\/\/.+\..+/.test(course.image)) {
        errors.push('Image URL is not in the correct format.');
    }
    return {
      isValid: errors.length === 0,
      errors,
    };
};

const validateVolunteerFields = (student) => {
    let errors = [];
  
    // Validate email
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!student.email || !emailPattern.test(student.email)) {
      errors.push("Invalid email address.");
    }
  
    // Validate password (at least 8 characters)
    if (!student.password || student.password.length < 8) {
      errors.push("Password must be at least 8 characters long.");
    }
  
    // Validate name (non-empty)
    if (!student.name || student.name.trim() === "") {
      errors.push("Name is required.");
    }
  
    // Validate contact (should be a number)
    if (!student.contact || isNaN(student.contact)) {
      errors.push("Contact should be a number.");
    }
  
    // Validate age group (non-empty)
    if (!student.age_group || student.age_group.trim() === "") {
      errors.push("Age group is required.");
    }
  
    // Validate remarks (non-empty)
    if (!student.remarks || student.remarks.trim() === "") {
      errors.push("Remarks are required.");
    }
  
    // Validate terms (must be agreed to)
    if (!student.termsCheckbox) {
      errors.push("You must agree to the terms and conditions.");
    }
    return {
      isValid: errors.length === 0,
      errors,
    };
  }

module.exports = {
    validateEventFields, validateVolunteerFields,
};