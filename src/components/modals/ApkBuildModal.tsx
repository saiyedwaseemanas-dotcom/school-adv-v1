import React, { useState } from 'react';

interface ApkBuildModalProps {
  isOpen: boolean;
  onClose: () => void;
  onShowToast: (message: string, icon?: string) => void;
}

export const ApkBuildModal: React.FC<ApkBuildModalProps> = ({
  isOpen,
  onClose,
  onShowToast,
}) => {
  const [activeTab, setActiveTab] = useState<'quick' | 'workflow' | 'local'>('quick');

  if (!isOpen) return null;

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    onShowToast(`${label} copied to clipboard!`, 'content_copy');
  };

  const workflowPath = '.github/workflows/build-apk.yml';
  const gitCommands = `git add .\ngit commit -m "Configure Android APK build with Capacitor and GitHub Actions"\ngit push origin main`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#283044]/50 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] flex flex-col shadow-2xl border border-[#eaedff] overflow-hidden z-10 animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-[#eaedff] flex items-center justify-between bg-[#f8f9fe]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#004ac6] text-white flex items-center justify-center shadow-sm">
              <span className="material-symbols-outlined text-[24px]">android</span>
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-[#131b2e] leading-tight">
                Build Android APK on GitHub
              </h2>
              <p className="text-xs text-[#515f74]">
                Automated cloud build pipeline using GitHub Actions & Capacitor
              </p>
            </div>
          </div>
          <button
            className="w-9 h-9 rounded-lg flex items-center justify-center text-[#434655] hover:bg-[#eaedff] transition-colors cursor-pointer"
            onClick={onClose}
            type="button"
            aria-label="Close"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Tab Bar */}
        <div className="flex border-b border-[#eaedff] bg-white px-4 pt-2 gap-2 text-xs font-semibold">
          <button
            className={`pb-2.5 px-3 border-b-2 cursor-pointer transition-colors ${
              activeTab === 'quick'
                ? 'border-[#004ac6] text-[#004ac6]'
                : 'border-transparent text-[#515f74] hover:text-[#131b2e]'
            }`}
            onClick={() => setActiveTab('quick')}
            type="button"
          >
            Step-by-Step Guide
          </button>
          <button
            className={`pb-2.5 px-3 border-b-2 cursor-pointer transition-colors ${
              activeTab === 'workflow'
                ? 'border-[#004ac6] text-[#004ac6]'
                : 'border-transparent text-[#515f74] hover:text-[#131b2e]'
            }`}
            onClick={() => setActiveTab('workflow')}
            type="button"
          >
            Workflow File & Config
          </button>
          <button
            className={`pb-2.5 px-3 border-b-2 cursor-pointer transition-colors ${
              activeTab === 'local'
                ? 'border-[#004ac6] text-[#004ac6]'
                : 'border-transparent text-[#515f74] hover:text-[#131b2e]'
            }`}
            onClick={() => setActiveTab('local')}
            type="button"
          >
            Local Android Studio
          </button>
        </div>

        {/* Body Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4 text-xs">
          {activeTab === 'quick' && (
            <div className="space-y-4">
              {/* Ready status banner */}
              <div className="p-3.5 bg-[#eaf1ff] rounded-xl border border-[#c6d7ff] flex items-start gap-3">
                <span className="material-symbols-outlined text-[#004ac6] text-[22px] shrink-0 mt-0.5">
                  check_circle
                </span>
                <div className="space-y-1">
                  <span className="font-bold text-[#003ea8] block">
                    Repository is 100% Configured for GitHub APK Builds
                  </span>
                  <p className="text-[#3b4858] leading-relaxed text-[11px]">
                    Capacitor Android wrapper and <code>{workflowPath}</code> have been created. When you push this project to GitHub, GitHub Actions will compile your APK automatically.
                  </p>
                </div>
              </div>

              {/* Steps */}
              <div className="space-y-3">
                <div className="flex items-start gap-3 p-3 bg-[#f8f9fe] rounded-xl border border-[#eaedff]">
                  <div className="w-6 h-6 rounded-full bg-[#004ac6] text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                    1
                  </div>
                  <div className="space-y-1 flex-1">
                    <span className="font-bold text-[#131b2e] block text-xs">
                      Export to GitHub
                    </span>
                    <p className="text-[#515f74] text-[11px]">
                      In Google AI Studio, click <strong>Settings</strong> (top right) &rarr; select <strong>Export to GitHub</strong>. If you are already working with a Git clone, push your commits to GitHub.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 bg-[#f8f9fe] rounded-xl border border-[#eaedff]">
                  <div className="w-6 h-6 rounded-full bg-[#004ac6] text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                    2
                  </div>
                  <div className="space-y-1 flex-1">
                    <span className="font-bold text-[#131b2e] block text-xs">
                      Run Workflow on GitHub Actions
                    </span>
                    <p className="text-[#515f74] text-[11px]">
                      Go to your GitHub repository in your browser &rarr; click on the <strong>Actions</strong> tab &rarr; select <strong>"Build Android APK"</strong> &rarr; click <strong>Run workflow</strong> (or simply push any commit to <code>main</code>).
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 bg-[#f8f9fe] rounded-xl border border-[#eaedff]">
                  <div className="w-6 h-6 rounded-full bg-[#004ac6] text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                    3
                  </div>
                  <div className="space-y-1 flex-1">
                    <span className="font-bold text-[#131b2e] block text-xs">
                      Download the Generated APK Artifact
                    </span>
                    <p className="text-[#515f74] text-[11px]">
                      Once the workflow finishes (green checkmark ~2-3 mins), click on the completed run and scroll to <strong>Artifacts</strong> at the bottom. Click <strong>EduTrack-Android-APK</strong> to download!
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 bg-[#f8f9fe] rounded-xl border border-[#eaedff]">
                  <div className="w-6 h-6 rounded-full bg-[#004ac6] text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                    4
                  </div>
                  <div className="space-y-1 flex-1">
                    <span className="font-bold text-[#131b2e] block text-xs">
                      Install on Your Android Phone
                    </span>
                    <p className="text-[#515f74] text-[11px]">
                      Transfer <code>EduTrack-debug.apk</code> to your phone (via Google Drive, USB, or download). Tap it to install. If prompted, allow "Install from unknown sources" in settings.
                    </p>
                  </div>
                </div>
              </div>

              {/* Git push snippet */}
              <div className="bg-[#131b2e] text-white p-3.5 rounded-xl space-y-2">
                <div className="flex items-center justify-between text-[#a6b4c9]">
                  <span className="font-mono text-[11px]">Quick Push Commands:</span>
                  <button
                    className="text-xs text-[#8ab4f8] hover:underline cursor-pointer flex items-center gap-1"
                    onClick={() => copyToClipboard(gitCommands, 'Git commands')}
                    type="button"
                  >
                    <span className="material-symbols-outlined text-[14px]">content_copy</span>
                    <span>Copy</span>
                  </button>
                </div>
                <pre className="font-mono text-[11px] text-[#e2e8f0] overflow-x-auto leading-relaxed">
                  {gitCommands}
                </pre>
              </div>
            </div>
          )}

          {activeTab === 'workflow' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-bold text-[#131b2e]">
                  Workflow File: <code className="text-[#004ac6]">{workflowPath}</code>
                </span>
                <button
                  className="px-2.5 py-1 bg-[#f2f3ff] text-[#004ac6] rounded-lg hover:bg-[#eaedff] font-semibold cursor-pointer flex items-center gap-1"
                  onClick={() => copyToClipboard(workflowPath, 'Workflow path')}
                  type="button"
                >
                  <span className="material-symbols-outlined text-[14px]">content_copy</span>
                  <span>Copy Path</span>
                </button>
              </div>

              <div className="p-3 bg-[#f8f9fe] rounded-xl border border-[#eaedff] space-y-2 text-[11px]">
                <div className="font-semibold text-[#131b2e]">Pipeline Details:</div>
                <ul className="list-disc list-inside space-y-1 text-[#515f74]">
                  <li><strong>Runner:</strong> <code>ubuntu-latest</code></li>
                  <li><strong>JDK:</strong> Eclipse Temurin 21 (actions/setup-java@v5)</li>
                  <li><strong>Node.js:</strong> v22 LTS</li>
                  <li><strong>Gradle Wrapper:</strong> Gradle 8.14.3</li>
                  <li><strong>Capacitor Android:</strong> v8.5+ with AGP 8.13</li>
                  <li><strong>Output Artifact:</strong> <code>EduTrack-debug.apk</code> in <code>build-artifacts/</code></li>
                  <li><strong>Retention:</strong> 30 days on GitHub Actions</li>
                </ul>
              </div>

              <div className="p-3 bg-[#f8f9fe] rounded-xl border border-[#eaedff] space-y-1.5 text-[11px]">
                <div className="font-semibold text-[#131b2e]">Package Configuration:</div>
                <p className="text-[#515f74]">
                  App Name: <strong>EduTrack</strong><br />
                  Package ID: <strong>com.edutrack.academic</strong><br />
                  Min SDK: <strong>24 (Android 7.0+)</strong> &bull; Target SDK: <strong>36 (Android 15+)</strong>
                </p>
              </div>
            </div>
          )}

          {activeTab === 'local' && (
            <div className="space-y-3">
              <p className="text-[#515f74] text-[11px] leading-relaxed">
                If you prefer building locally on your laptop with Android Studio instead of GitHub Actions:
              </p>

              <div className="space-y-2 font-mono text-[11px]">
                <div className="p-3 bg-[#131b2e] text-[#e2e8f0] rounded-xl space-y-1">
                  <div className="text-[#a6b4c9]"># 1. Install dependencies & build web app</div>
                  <div>npm install</div>
                  <div>npm run build:android</div>
                </div>

                <div className="p-3 bg-[#131b2e] text-[#e2e8f0] rounded-xl space-y-1">
                  <div className="text-[#a6b4c9]"># 2. Open project in Android Studio</div>
                  <div>npx cap open android</div>
                </div>

                <div className="p-3 bg-[#131b2e] text-[#e2e8f0] rounded-xl space-y-1">
                  <div className="text-[#a6b4c9]"># 3. Or build APK directly via command line</div>
                  <div>cd android && ./gradlew assembleDebug</div>
                </div>
              </div>

              <p className="text-[#515f74] text-[11px]">
                The generated APK will be located at: <code>android/app/build/outputs/apk/debug/app-debug.apk</code>.
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-[#eaedff] bg-[#f8f9fe] flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-[#515f74] text-[11px]">
            <span className="material-symbols-outlined text-[16px] text-[#15803d]">verified</span>
            <span>Ready for GitHub Actions</span>
          </div>
          <button
            className="px-4 py-2 bg-[#004ac6] text-white rounded-xl text-xs font-bold hover:bg-[#003ea8] transition-colors cursor-pointer"
            onClick={onClose}
            type="button"
          >
            Got it, Let's Build
          </button>
        </div>
      </div>
    </div>
  );
};
