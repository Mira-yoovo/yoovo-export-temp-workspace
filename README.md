Steps to Run the Workspace
# Yoovo Export Workspace

This workspace contains the `yoovo-export-library` as a Git submodule.  
Follow the steps below to clone, install, and build it.

---

## 1. Clone the workspace (with submodule)

git clone --recurse-submodules <WORKSPACE_REPO_URL>
cd <WORKSPACE_FOLDER>

If you cloned without --recurse-submodules, run:

git submodule update --init --recursive

2. Switch the library to the correct branch (develop)

The export library lives under projects/yoovo-export-library.

cd projects/yoovo-export-library
git checkout develop
git pull
cd ../..

3. Install dependencies (workspace root)
npm install

4. Build the library
ng build yoovo-export-library

Build output will be generated in:

dist/yoovo-export-library/

Done! 🎉

The workspace is now fully set up and ready for development or integration.
