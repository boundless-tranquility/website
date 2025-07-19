// Script to dynamically update the year in README.md
const fs = require('fs');
const { execSync } = require('child_process');

function updateReadmeYear() {
    try {
        // Read the README file
        let content = fs.readFileSync('README.md', 'utf8');
        const currentYear = new Date().getFullYear();
        
        // Replace hardcoded years with current year
        const updatedContent = content.replace(
            /©\s*202[4-5]\s+Boundless Tranquility Capital Limited/g,
            `© ${currentYear} Boundless Tranquility Capital Limited`
        );
        
        // Only write if content changed
        if (content !== updatedContent) {
            fs.writeFileSync('README.md', updatedContent, 'utf8');
            console.log(`✅ Updated year in README.md to ${currentYear}`);
            
            // Auto-commit and push the changes
            try {
                execSync('git add README.md', { stdio: 'inherit' });
                execSync('git commit -m "Auto-update: Update year in README [skip ci]"', { stdio: 'inherit' });
                console.log(`🔄 Auto-committed year update`);
                return true;
            } catch (gitError) {
                console.log(`ℹ️  Could not auto-commit: ${gitError.message}`);
                return true;
            }
        } else {
            console.log(`ℹ️  No changes needed in README.md`);
            return false;
        }
    } catch (error) {
        console.error(`❌ Error updating README.md:`, error.message);
        return false;
    }
}

// Run the update
if (require.main === module) {
    updateReadmeYear();
}

module.exports = { updateReadmeYear }; 