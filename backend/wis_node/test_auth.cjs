// Simple test to verify authentication logic
const jwt = require('jsonwebtoken');

// Test environment variables
process.env.EMAIL = 'admin@winconstructures.com';
process.env.PASSWORD = 'SecureAdminPassword123!';
process.env.JWT_SECRET = 'test_secret_key';

// Simulate login logic
function testLogin(email, password) {
  const adminEmail = process.env.EMAIL;
  const adminPassword = process.env.PASSWORD;

  if (!adminEmail || !adminPassword) {
    return { error: "Server configuration error" };
  }

  if (email !== adminEmail || password !== adminPassword) {
    return { error: "Invalid email or password" };
  }

  const accessToken = jwt.sign(
    { email, role: "admin" },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );

  return {
    accessToken,
    user: {
      email,
      firstName: "Admin",
      lastName: "User",
      role: "Super Admin"
    }
  };
}

// Test cases
console.log('🧪 Testing Authentication Logic\n');

// Test 1: Valid credentials
console.log('Test 1: Valid credentials');
const result1 = testLogin('admin@winconstructures.com', 'SecureAdminPassword123!');
console.log('✅ Success:', result1.user ? 'Login successful' : 'Login failed');

// Test 2: Invalid email
console.log('\nTest 2: Invalid email');
const result2 = testLogin('wrong@email.com', 'SecureAdminPassword123!');
console.log('❌ Error:', result2.error);

// Test 3: Invalid password
console.log('\nTest 3: Invalid password');
const result3 = testLogin('admin@winconstructures.com', 'wrongpassword');
console.log('❌ Error:', result3.error);

// Test 4: Missing credentials
console.log('\nTest 4: Missing credentials');
const result4 = testLogin('', '');
console.log('❌ Error:', result4.error);

// Test 5: Verify JWT token
console.log('\nTest 5: Verify JWT token');
try {
  const decoded = jwt.verify(result1.accessToken, process.env.JWT_SECRET);
  console.log('✅ Token valid:', decoded.email === 'admin@winconstructures.com' && decoded.role === 'admin');
} catch (error) {
  console.log('❌ Token invalid');
}

console.log('\n✨ All authentication tests completed!');