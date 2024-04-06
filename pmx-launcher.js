const CONFIG_FILE = "pmx.json";

const fs = require("fs");
const path = require("path");

var Figlet = require("./figlet-node").Figlet;
Figlet.write("PMx", "isometric2", function (str) {
  console.log(str);
  run();
});

function run() {
  const config = JSON.parse(
    fs.readFileSync(path.join(__dirname, CONFIG_FILE), "utf8")
  );

  // 실행 인자 불러오기
  const args = process.argv.slice(2);
  // 명령어 인자
  const command = args[0];

  // 제외 대상
  const exclude = process.argv.slice(3);

  switch (command) {
    case "list":
      list(config);
      break;

    case "run":
      runPipeline(config, exclude);
      break;

    default:
      console.log("\x1b[36m%s\x1b[0m", "[PMx]\x1b[33m Invalid argument");
  }
}

function list(config) {
  const data = config?.target;

  if (!data) {
    console.error("\x1b[36m%s\x1b[0m", "[PMx]\x1b[33m No target list");
    return;
  }

  for (let i = 0; i < data.length; i++) {
    if (data[i]?.build) {
      delete data[i].build;
    }
    if (data[i]?.args) {
      delete data[i].args;
    }
    if (data[i]?.workdir) {
      delete data[i].workdir;
    }
  }

  console.log("\x1b[36m%s\x1b[0m", "[PMx]\x1b[33m Target List");
  console.table(data);
}

function runPipeline(config, exclude) {
  const data = config?.target;

  if (!data) {
    console.error("\x1b[36m%s\x1b[0m", "[PMx]\x1b[33m No target list");
    return;
  }

  console.log("\x1b[36m%s\x1b[0m", "[PMx]\x1b[33m PMx Runner Start");

  // Build
  data.forEach((target) => {
    const { build, name, command, args, workdir } = target;

    if (exclude && exclude.includes(name)) {
      console.log(
        "\x1b[36m%s\x1b[0m",
        `[PMx RUNNER]\x1b[33m Exclude target ==> ${name}`
      );
    } else {
      if (build?.isEnable) {
        console.log("\x1b[36m%s\x1b[0m", `[PMx RUNNER]\x1b[33m Build ${name}`);

        const child = require("child_process").spawn(
          build.command,
          build.args,
          {
            cwd: build?.workdir,
            stdio: "inherit",
          }
        );

        child.on("exit", (code) => {
          console.log(
            "\x1b[36m%s\x1b[0m",
            `[PMx RUNNER]\x1b[33m Child process ${name} exited with code ${code}`
          );

          if (code === 0) {
            runner(name, command, args, workdir);
          }
        });

        child.on("error", (err) => {
          console.error(
            "\x1b[36m%s\x1b[0m",
            `[PMx RUNNER]\x1b[33m Child process ${name} error: ${err}`
          );
        });
      } else {
        runner(name, command, args, workdir);
      }
    }
  });
}

function runner(name, command, args, workdir) {
  const child = require("child_process").spawn(command, args, {
    cwd: workdir,
    stdio: "inherit",
  });

  child.on("exit", (code) => {
    console.log(
      "\x1b[36m%s\x1b[0m",
      `[PMx RUNNER]\x1b[33m Child process ${name} exited with code ${code}`
    );
  });

  child.on("error", (err) => {
    console.error(
      "\x1b[36m%s\x1b[0m",
      `[PMx RUNNER]\x1b[33m Child process ${name} error: ${err}`
    );
  });
}
