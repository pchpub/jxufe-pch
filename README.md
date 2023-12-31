<h1 align="center">JXUFE-PCH</h1>
<p align="center">
  A simple server to access the fucking educational administration system of Jiangxi University of Finance and Economics
  <br />
  <a href="https://github.com/pchpub/jxufe-pch/issues">Report Bug</a>
  ·
  <a href="https://github.com/pchpub/jxufe-pch/pulls">PR</a>
</p>

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Author](#author)
- [License](#license)

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
