
<p align="center">
  <h1 align="center">JXUFE-PCH</h1>
  <p align="center">
    A simple server to access the broken educational administration system of Jiangxi University of Finance and Economics
    <br />
    <a href="https://github.com/pchpub/jxufe-pch/issues">Report Bug</a>
    ·
    <a href="https://github.com/pchpub/jxufe-pch/pulls">PR</a>
  </p>
</p>

## 目录

- [Install](#install)
- [Use](#use)
- [Author](#author)
- [License](#license)

### Install

1. Install rust

   ```sh
   curl --proto '=https' --tlsv1.2 https://sh.rustup.rs -sSf | sh
   ```

2. Clone the repo

   ```sh
   git clone https://github.com/pchpub/jxufe-pch.git
   ```

3. Compile

   ```sh
   cd jxufe-pch
   cargo build --profile==fast
   ```

4. Rename config.json & Edit it

   ```sh
   mv config.example.json config.json
   vim config.json
   ```

5. Run

   ```sh
   cargo run --profile==fast
   ```

### Use

   Open your browser and access http://[your ip address]:[your port in config.json]

### Author

   PCH

### License

   This project is licensed under the [GNU General Public License v3.0](./LICENSE).
