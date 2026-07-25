```
npm init -y

npm install express mongoose dotenv

npm install -D typescript ts-node-dev @types/node @types/express

npx tsc --init
```
tsconfig.json: 
```
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "commonjs",
    "rootDir": "./src",
    "outDir": "./dist",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true
  }
}
```

Package.json: 
```
"scripts": {
  "dev": "ts-node-dev --respawn src/index.ts"
}
```

how to run:
```
npm run dev
```