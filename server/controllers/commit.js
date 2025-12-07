import fs from "fs/promises";
import path from "path";
import {v4 as uuidv4} from "uuid";

async function commitRepo(message){
    const repoPath = path.resolve(process.cwd(), '.CodeUs');
    const stagedPath = path.join(repoPath, 'staging');
    const commitsPath = path.join(repoPath, 'commits');
    try{
        const commitID=uuidv4();
        const commitDir = path.join(commitsPath, commitID);
        await fs.mkdir(commitDir, {recursive: true});

        const files = await fs.readdir(stagedPath);
        for(const file of files){
            const srcPath = path.join(stagedPath, file);
            const destPath = path.join(commitDir, file);
            await fs.copyFile(srcPath, destPath);
        }

        await fs.writeFile(path.join(commitDir, "commit.json"), JSON.stringify({
            id: commitID,
            message: message,
            timestamp: new Date().toISOString()
        }));
        console.log(`Committed changes with ID: ${commitID}`);
    }
    catch(e){
        console.error("Error committing repository:", e);
    }
}

export default commitRepo;