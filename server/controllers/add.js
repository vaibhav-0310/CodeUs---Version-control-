import fs from 'fs/promises';
import path from 'path';

async function addRepo(filePath) {
    const repoPath = path.join(process.cwd(), '.CodeUs');
    const stagingPath = path.join(repoPath, 'staging');

    try {
        await fs.mkdir(stagingPath, { recursive: true });
        const fileName=path.basename(filePath);
        await fs.copyFile(filePath, path.join(stagingPath, fileName));
        console.log('file added to staging successfully.');
    } catch (error) {
        console.error('Error initializing repository:', error);
    }
}

export default addRepo;