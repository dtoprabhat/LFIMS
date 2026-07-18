/*******************************************************
 * AuthService.gs
 * Username/Password Authentication
 *******************************************************/

/**
 * SHA-256 Hash
 */
function hashPassword(password) {
  const bytes = Utilities.computeDigest(
    Utilities.DigestAlgorithm.SHA_256,
    password,
    Utilities.Charset.UTF_8
  );

  return bytes.map(function(b) {
    let v = (b < 0 ? b + 256 : b).toString(16);
    return v.length === 1 ? "0" + v : v;
  }).join("");
}

/**
 * Login
 */
function login(username, password) {

  const sh = getSheet("Users");

  if (!sh) {
    return failure("Users sheet not found.");
  }

  const data = sh.getDataRange().getValues();

  if (data.length < 2) {
    return failure("No users available.");
  }

  const hash = hashPassword(password);

  for (let i = 1; i < data.length; i++) {

    const row = data[i];

    if (
      row[1] === username &&
      row[2] === hash &&
      row[6] === "Active"
    ) {

      PropertiesService
        .getUserProperties()
        .setProperty("CURRENT_USER", username);

      PropertiesService
        .getUserProperties()
        .setProperty("CURRENT_ROLE", row[4]);

      sh.getRange(i + 1, 8).setValue(new Date());

      writeAudit("LOGIN", "AUTH", username);

      return success("Login successful.", {
        username: username,
        role: row[4],
        name: row[3]
      });
    }
  }

  return failure("Invalid username or password.");
}

/**
 * Logout
 */
function logout() {

  PropertiesService
    .getUserProperties()
    .deleteProperty("CURRENT_USER");

  PropertiesService
    .getUserProperties()
    .deleteProperty("CURRENT_ROLE");

  return success("Logged out.");
}

/**
 * Current User
 */
function currentUser() {

  return PropertiesService
    .getUserProperties()
    .getProperty("CURRENT_USER");
}

/**
 * Current Role
 */
function currentRole() {

  return PropertiesService
    .getUserProperties()
    .getProperty("CURRENT_ROLE");
}

/**
 * Check Login
 */
function isLoggedIn() {

  return currentUser() !== null;
}

/**
 * Require Role
 */
function requireRole(role) {

  return currentRole() === role;
}function createAdminHash() {
  Logger.log(hashPassword("admin123"));
}/*******************************************************
 * Create Default Administrator
 *******************************************************/
function createDefaultAdmin() {

  const sh = getSheet("Users");

  if (!sh) {
    SpreadsheetApp.getUi().alert("Users sheet not found.");
    return;
  }

  // Check whether admin already exists
  const data = sh.getDataRange().getValues();

  for (let i = 1; i < data.length; i++) {
    if (data[i][1] === "admin") {
      SpreadsheetApp.getUi().alert("Admin user already exists.");
      return;
    }
  }

  const hash = hashPassword("admin123");

  sh.appendRow([
    1,                      // User_ID
    "admin",                // Username
    hash,                   // Password Hash
    "System Administrator", // Name
    "Administrator",        // Role
    "Head Office",          // Department
    "Active",               // Status
    ""                      // Last Login
  ]);

  SpreadsheetApp.getUi().alert(
    "Default Administrator Created.\n\n" +
    "Username : admin\n" +
    "Password : admin123\n\n" +
    "Please change the password after first login."
  );
}
