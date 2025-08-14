import Link from 'next/link'
import { Button } from "rsuite";

export default function NotFound() {
  return (
    <div className="Errorbody flex w-full h-full justify-center items-center mt-9 max-w-7xl mx-auto">
        <div className="message w-[750px] h-[450px] flex items-center pt-6 flex-col">
          <div className="header w-full text-center">
            <h1
              className="text-[220px] leading-none font-extrabold text-white mq450:text-[100px] mq750:text-[130px] mq1100:text-[160px]"
              style={{
                backgroundImage: `url(/assets/textoverlap.png)`,
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                color: "transparent",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              OOPS!
            </h1>
          </div>
          <div className="message-body flex flex-col w-full text-center">
            <p className="font-extrabold text-[25px] mq450:text-[15px] mq750:text-[18px] mq1100:text-[22px]">404 - PAGE NOT FOUND</p>
            <p className="font-light mq450:text-[12px] mq750:text-[14px] mq1100:text-[16px]">
              The page you are looking for might have been removed
              <br />
              had its name changed or is temporarily unavailable.
            </p>
          </div>
          <Link href={"/"}>
          <Button
            appearance="primary"
            className="mt-4"
            color="cyan"
          >
            GO TO HOMEPAGE
          </Button>
          </Link>
        </div>
      </div>
  )
}