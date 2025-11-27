import fs from "fs/promises";
import path from "path";

async function initRepo(){
    const repoPath = path.resolve(process.cwd(),".CodeUs");
    const commitsPath =path.join(repoPath,"commits");

    try{
        await fs.mkdir(repoPath,{recursive:true});
        await fs.mkdir(commitsPath,{recursive:true})
        await fs.writeFile(
            path.join(repoPath,"config.json"),
            JSON.stringify({bucket:process.env.S3_BUCKET || "s3 bucket"})
        );
        console.log("repo intialised");
    }
    catch(err){
      console.error("Error initialising the repo ",err);
    }
}

export default initRepo;