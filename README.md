How to Publish HTML report in Github
Steps:
    1. Create new branch named gh-pages
        - git checkout --orphan gh-pages
        - git rm -rf .  -- Removed all exiting file from the branch

    2. Create Initial commit to the Branch
        - echo "Github Pages" > index.html
        - git add index.html
        - git commit "Initial commit for github pages"
        - git push -u origin gh-pages
    
    3. Configure GitHub Pages:
        - Go to your repository on GitHub.
        - Navigate to the repository settings.
        - Scroll down to the "Pages" section in the sidebar.
        - Under "Source", select the gh-pages branch and click "Save".

    4. Generate and Push HTML Report to gh-pages Branch:
        - After running your Cypress tests and generating the HTML report, you need to copy the report files to the gh-pages branch. You can - - automate this process using a script or a GitHub Actions workflow.
        
        Here’s an example of how you can automate this process using a GitHub Actions workflow:

            name: Cypress Tests and Deploy Report

            on: push

            jobs:
            cypress-run:
                runs-on: ubuntu-latest
                steps:
                - name: Checkout code
                    uses: actions/checkout@v4

                - name: Install dependencies
                    run: npm install

                - name: Run Cypress tests
                    uses: cypress-io/github-action@v6
                    with:
                    browser: chrome
                    headless: true

                - name: Generate HTML report
                    run: npm run generate-report # Adjust this to your report generation command

                - name: Deploy report to GitHub Pages
                    if: success()
                    run: |
                    git config --global user.name 'github-actions[bot]'
                    git config --global user.email 'github-actions[bot]@users.noreply.github.com'
                    git clone --branch=gh-pages https://github.com/${{ github.repository }} gh-pages
                    rm -rf gh-pages/*
                    cp -r path/to/your/report/* gh-pages/
                    cd gh-pages
                    git add --all
                    git commit -m "Update HTML report"
                    git push origin gh-pages

      In this workflow:

        The Cypress tests run in headless mode.
        After the tests run, the report is generated.
        The report files are copied to the gh-pages branch, overwriting the old files.
        The changes are committed and pushed to the gh-pages branch.
        Make sure to adjust the paths and commands to match your specific project setup.

        This process ensures that your Cypress HTML report is automatically generated and published to GitHub Pages each time you push changes to the repository. You can then access the report at https://<your-username>.github.io/<your-repository>/.              
      

    5. Install mochawesome and Related Packages:
       First, ensure you have mochawesome and other necessary packages installed in your project:
            - npm install --save-dev mochawesome mochawesome-merge mochawesome-report-generator

    6. Configure Cypress to Use mochawesome:

        Add the following configuration to your cypress.json file:

        {
        "reporter": "mochawesome",
        "reporterOptions": {
            "reportDir": "cypress/reports",
            "overwrite": false,
            "html": false,
            "json": true
        }
    } 

    7. Add Scripts to package.json:

       Add a script to generate the report using mochawesome-merge and mochawesome-report-generator:
       "scripts": {
                    "cy:run": "cypress run",
                    "generate-report": "npx mochawesome-merge cypress/reports/*.json > cypress/reports/report.json && npx mochawesome-report-generator cypress/reports/report.json"
                    }
    












