[![MIT licensed](https://img.shields.io/badge/license-MIT-blue.svg)](./LICENSE-MIT)

# PMx Launcher
Simple launcher!!!

## How to use?
pmx.json
```json
{
  "target": [
    {
      "name": "eureka_server",
      "build": {
        "isEnable": true,
        "command": "./gradlew",
        "args": ["build"],
        "workdir": "/Users/user/Desktop/my-project/eureka_server"
      },
      "command": "java",
      "args": [
        "-jar",
        "-DPMX_PROFILE_ENV=production",
        "eureka_server-0.0.1-SNAPSHOT.jar"
      ],
      "workdir": "/Users/user/Desktop/my-project/eureka_server/build/libs",
      "priority": 0,
      "delay": 0
    }
  ]
}
```

Create the file and run "node pmx-launcher.js run [Exclude Target Name]" !!

## Commands
- list
- run

**Ex) node pmx-launcher.js <run> or <list>**
    
# License
MIT License

Copyright (c) 2022 CHOI SI-HUN

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
