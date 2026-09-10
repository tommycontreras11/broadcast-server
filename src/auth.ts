import readline from "node:readline";
import fs from "fs/promises";

interface IUser {
  username: string;
  password: string;
}

export const signUp = async () => {
  const readlineInterface = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  let userFound = true;
  let username = "";

  do {
    username = await question(readlineInterface, "Username: ");
    const user = await getUserByUsername(username);

    if (user) {
      console.error("Please, select another username");
      userFound = true;
    }
  } while (!userFound);

  const password = await question(readlineInterface, "Password: ");

  const data = await readData()

  data.push({
    username,
    password,
  })

  saveData(data)

  console.log("User registered successfully.");
};

export const signIn = async () => {
  const readlineInterface = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  let validCredentials = true;

  do {
    const username = await question(readlineInterface, "User: ");
    const password = await question(readlineInterface, "Password: ");

    const user = await getUserByUsername(username);

    if (!user || user?.username != username || user?.password != password) {
      console.error("Username y/o password invalid.");
      validCredentials = false;
    } else {
      validCredentials = true;
    }
  } while (!validCredentials);

  console.log("Authenticated successfully.");
};

const getUserByUsername = async (username: string) => {
    const users = await readData()
    return users.find((user) => user.username == username)
}

function question(
  readlineInterface: readline.Interface,
  question: string,
): Promise<string> {
  return new Promise((resolve) => {
    readlineInterface.question(question, resolve);
  });
}

const USER_PATH = "user.json";

const saveData = async (user: IUser[]) => {
  await fs.appendFile(USER_PATH, JSON.stringify(user, null, 2), "utf8");
};

const readData = async (): Promise<IUser[]> => {
  try {
    const data = await fs.readFile(USER_PATH, "utf8");
    return JSON.parse(data);
  } catch (error: any) {
    if (error.code == "ENOENT") {
      saveData([]);
      return [];
    }

    throw error;
  }
};
