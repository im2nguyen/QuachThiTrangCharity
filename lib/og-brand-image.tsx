import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const ogImageAlt = "Quách Thị Trang Foundation";
export const ogImageSize = { width: 1200, height: 630 };
export const ogImageContentType = "image/png";

const MERRIWEATHER_BOLD =
  "https://fonts.gstatic.com/s/merriweather/v33/u-4D0qyriQwlOrhSvowK_l5UcA6zuSYEqOzpPe3HOZJ5eX1WtLaQwmYiScCmDxhtNOKl8yDrOSAqEw.ttf";
const OSWALD_REGULAR =
  "https://fonts.gstatic.com/s/oswald/v57/TK3_WkUHHAIjg75cFRf3bXL8LICs1_FvgUE.ttf";

export async function createOgBrandImage() {
  const [bust, merriweatherBold, oswaldRegular] = await Promise.all([
    readFile(join(process.cwd(), "public/images/quach-thi-trang.png")),
    fetch(MERRIWEATHER_BOLD).then((res) => res.arrayBuffer()),
    fetch(OSWALD_REGULAR).then((res) => res.arrayBuffer()),
  ]);

  const bustSrc = `data:image/png;base64,${bust.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          height: "100%",
          backgroundColor: "#f4f6f8",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 56,
          }}
        >
          <img
            src={bustSrc}
            alt=""
            height={300}
            style={{ objectFit: "contain" }}
          />
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                fontFamily: "Merriweather",
                fontSize: 76,
                fontWeight: 700,
                color: "#2f3742",
                lineHeight: 1.05,
              }}
            >
              Quách Thị Trang
            </div>
            <div
              style={{
                fontFamily: "Oswald",
                fontSize: 34,
                fontWeight: 400,
                letterSpacing: "0.2em",
                color: "#5e7388",
                marginTop: 10,
                paddingLeft: 6,
                textTransform: "uppercase",
              }}
            >
              Foundation
            </div>
          </div>
        </div>
      </div>
    ),
    {
      ...ogImageSize,
      fonts: [
        {
          name: "Merriweather",
          data: merriweatherBold,
          weight: 700,
          style: "normal",
        },
        {
          name: "Oswald",
          data: oswaldRegular,
          weight: 400,
          style: "normal",
        },
      ],
    }
  );
}
