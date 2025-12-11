export const combineName = (firstName, lastName) => {
  return `${firstName} ${lastName}`.trim();
};

export const splitName = (fullName) => {
  if (!fullName) return { firstName: "", lastName: "" };
  
  const parts = fullName.trim().split(" ");
  if (parts.length === 1) {
    return { firstName: parts[0], lastName: "" };
  }
  
  const lastName = parts.pop();
  const firstName = parts.join(" ");
  
  return { firstName, lastName };
};

export const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric' 
  });
};
