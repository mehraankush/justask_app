/** @type {import('next').NextConfig} */
const nextConfig = {
    typescript:{
        ignoreBuildErrors:true,
    },
    images:{
        domains:["oaidalleapiprodscus.blob.core.windows.net","lh3.googleusercontent.com"]
    }
}

module.exports = nextConfig
