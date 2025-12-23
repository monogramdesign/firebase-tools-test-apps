import { execSync, spawn } from "child_process"
import { readFile, writeFile } from "fs/promises"
import { join } from "path"

// eslint-disable-next-line import/newline-after-import
;(async () => {
  execSync("rm -rf .next/routes-manifest.json")

  console.log("building...")
  const build = spawn("npx", ["next", "build"], {
    stdio: "ignore",
  })

  const pagePaths = await new Promise<string[]>((resolve) =>
    setInterval(async () => {
      await readFile(join(process.cwd(), ".next", "routes-manifest.json"), "utf-8")
        .then((data) => {
          const { staticRoutes } = JSON.parse(data)

          resolve(
            (
              staticRoutes.map(
                (route: unknown) =>
                  // @ts-ignore
                  route.page
              ) as string[]
            ).filter((route) => !route.includes("."))
          )
          build.kill()
        })
        .catch(() => {
          console.log("not there yet")
        })
    }, 500)
  )

  await writeFile(
    join(process.cwd(), "app", "pages.json"),
    JSON.stringify([...pagePaths, "/dynamic-routes/2"], null, 2)
  )
  console.log("file written!")

  process.exit(0)
})()
