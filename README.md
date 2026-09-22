# EduTrack - Academic Management Application & Android APK Build

EduTrack is a modern academic management application built with React, Vite, Tailwind CSS, and Capacitor for Android deployment.

---

## 📱 How to Build the Android APK on GitHub (Automated CI/CD)

This repository includes a pre-configured **GitHub Actions Workflow** (`.github/workflows/build-apk.yml`) that builds an Android APK (`EduTrack-debug.apk`) in the cloud every time you push code or trigger the build manually.

### Step 1: Export or Push to GitHub
1. In Google AI Studio, click on **Settings** (or the project menu) in the top-right corner.
2. Select **Export to GitHub** (or connect your GitHub repository).
3. Push your codebase to the `main` or `master` branch.

### Step 2: Triggering the APK Build
The APK build runs automatically:
- **On every push** to `main` or `master`
- **Manually via GitHub Actions UI**:
  1. Open your repository on GitHub.
  2. Click on the **Actions** tab at the top.
  3. Under "All workflows", select **Build Android APK**.
  4. Click the **Run workflow** dropdown on the right.
  5. Select the branch (`main`) and choose `debug` (or `release`), then click the green **Run workflow** button.

### Step 3: Downloading Your APK
1. When the workflow completes (green checkmark, typically ~2–3 minutes), click on the completed run.
2. Scroll down to the **Artifacts** section at the bottom of the page.
3. Click on **`EduTrack-Android-APK`** to download the zip file.
4. Extract the zip to find your ready-to-install **`EduTrack-debug.apk`**!

### Step 4: Installing on Your Android Phone
1. Transfer the `.apk` file to your phone (via USB, Google Drive, WhatsApp, Telegram, or direct download).
2. Tap the `.apk` file to install.
3. If prompted, enable **"Install unknown apps"** in your Android device settings.
4. Open **EduTrack** and enjoy the full native mobile experience!

---

## 💻 Local Android Development (Optional)

If you have **Android Studio** installed on your local computer:

1. Clone your GitHub repository:
   ```bash
   git clone <your-repo-url>
   cd <your-repo-folder>
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Build web assets and sync to Android:
   ```bash
   npm run build:android
   ```

4. Open the project in Android Studio:
   ```bash
   npx cap open android
   ```

5. In Android Studio, click **Build > Build Bundle(s) / APK(s) > Build APK(s)** or click the green **Run** button to run on an emulator/connected physical device.
