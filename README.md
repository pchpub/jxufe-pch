<h1 align="center">JXUFE-PCH</h1>
<p align="center">
  A simple server to access the fucking educational administration system of Jiangxi University of Finance and Economics
  <br />
  <a href="https://github.com/pchpub/jxufe-pch/issues">Report Bug</a>
  ·
  <a href="https://github.com/pchpub/jxufe-pch/pulls">PR</a>
</p>

## Table of Contents

- [About the Project](#about-the-project)
- [Features](#features)
- [System Requirements](#system-requirements)
- [Installation](#installation)
- [Usage](#usage)
- [FAQs](#faqs)
- [License](#license)

### About the Project

In order to improve the poor course selection experience, I wrote this program.
At first, this project was used as a simple course schedule crawling project,
but I was very angry that I did not grab the course selection for the first semester of 2023-2024,
so this project was born Got it

### Features

- [x] login page
- [x] reverse proxy
- [x] static resource cache
- [ ] dynamic resource cache

### System Requirements

Before installing and running JXUFE-PCH, please ensure your system meets the following requirements:

#### Operating System

- Windows: Windows 10 or later.
- macOS: macOS 10.15 (Catalina) or later.
- Linux: Most modern distributions like Ubuntu 20.04, Fedora 33, Debian 10, etc.

#### Hardware

- CPU: 512MHz or faster processor. (Use precompiled programs)
- RAM: 100MB or more. (Use precompiled programs)
- Storage: Minimum 60MB free space. (Use precompiled programs)

#### Software Dependencies

- Rust: Version 1.75.0 or later.
- Git: Latest version.

#### Network

- Stable internet connection for downloading dependencies and updates.

#### Additional Notes

- When not using a precompiled program there may be a situation where it doesn't work on another machine (due to openssl)
- Ensure all system drivers, especially graphics and network drivers, are up to date.

### FAQs

#### Q1: How to use precompiled programs?

1. download the latest release from [here](https://github.com/pchpub/jxufe-pch/releases/tag/alpha-releases)
2. download the [static resource](https://github.com/pchpub/jxufe-pch/tree/master/static)
3. configure the [config.json](https://github.com/pchpub/jxufe-pch/blob/master/config.example.json)(rename from config.example.json to config.json)

#### Q2: How to use the source code?

see [Installation](#installation)

#### Q3: How to update?

##### Precompiled programs

1. Download the latest release from [here](https://github.com/pchpub/jxufe-pch/releases/tag/alpha-releases)
2. Replace the old program with the new one
3. Restart the program

##### Source code

1. Pull the latest code from the repository
2. Compile the code
3. Replace the old program with the new one
4. Restart the program

#### Q4: How to configure?

see [Installation](#installation)

#### Q5: How to run?

see [Usage](#usage)

#### Q6: How to stop?

press `Ctrl+C` in the terminal

#### Q7: How to uninstall?

delete the program

#### Q8: Why does the login page not appear?

1. Check if the program is running
2. Check if the port is occupied
3. Check if the configuration is correct
4. Check if the [static resource](https://github.com/pchpub/jxufe-pch/tree/master/static) is downloaded correctly

### Installation

1. **Install Rust:**

   ```sh
   curl --proto '=https' --tlsv1.2 https://sh.rustup.rs -sSf | sh
   ```

2. **Clone the Repository**

   ```sh
   git clone https://github.com/pchpub/jxufe-pch.git
   ```

3. **Compile the Code**

   ```sh
   cd jxufe-pch
   cargo build --profile==fast
   ```

4. **Configure**

   ```sh
   mv config.example.json config.json
   vim config.json
   ```

5. **Run the Server**

   ```sh
   cargo run --profile==fast
   ```

### Usage

   Open your browser and navigate to `http://[your-ip-address]:[port-in-config.json]`

### Author

   PCH

### License

   This project is licensed under the [GNU General Public License v3.0](./LICENSE).
