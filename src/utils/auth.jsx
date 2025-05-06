const mockUsers = [
  { email: 'superadmin@example.com', password: 'admin123', role: 'super_admin' },
  { email: 'student@example.com', password: 'student123', role: 'student' },
  { email: 'counselor@example.com', password: 'counselor123', role: 'counselor' },
  { email: 'mediachannel@example.com', password: 'media123', role: 'media_channel' },
  { email: 'helpdesk@example.com', password: 'helpdesk123', role: 'helpdesk_officer' },
];

export const login = (email, password) => {
  const user = mockUsers.find(
    (u) => u.email === email && u.password === password
  );
  if (user) {
    const token = btoa(JSON.stringify({ email: user.email, role: user.role }));
    localStorage.setItem('token', token);
    localStorage.setItem('userRole', user.role);
    return { success: true, user: { email: user.email, role: user.role } };
  }
  return { success: false, error: 'Invalid email or password' };
};

export const signup = (email, password, role) => {
  if (mockUsers.some((u) => u.email === email)) {
    return { success: false, error: 'Email already exists' };
  }
  mockUsers.push({ email, password, role });
  return { success: true, user: { email, role } };
};

export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('userRole');
};

export const getCurrentUser = () => {
  const token = localStorage.getItem('token');
  if (!token) {
    return null; // No token exists, return null
  }

  try {
    // Decode the base64 token
    let decodedToken;
    try {
      decodedToken = atob(token);
    } catch (err) {
      console.error('Failed to decode token with atob:', err.message);
      return null; // Invalid base64 string
    }

    // Parse the decoded token as JSON
    let user;
    try {
      user = JSON.parse(decodedToken);
    } catch (err) {
      console.error('Failed to parse token as JSON:', err.message);
      return null; // Invalid JSON
    }

    // Validate the user object structure
    if (!user || typeof user !== 'object' || !user.email || !user.role) {
      console.error('Invalid user object in token:', user);
      return null; // Missing required fields
    }

    return { email: user.email, role: user.role };
  } catch (err) {
    // Catch any unexpected errors
    console.error('Unexpected error in getCurrentUser:', err.message);
    return null;
  }
};