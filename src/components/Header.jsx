import { Card, CardBody, Image } from "@heroui/react";
import reactLogo from '../assets/react.svg'

export default function Header() {
  return (
    <section className="w-full flex justify-center p-8 mt-16">
      <div className="w-full max-w-7xl">
        <Card className="w-full shadow-lg">
          <CardBody className="p-8 md:p-12">
            <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
              {/* Left side - Text content */}
              <div className="flex-1 text-center lg:text-left">
                <h2 className="!text-primary !font-normal -mb-4">
                  I am
                </h2>
                <name>
                  Kevin Wang
                </name>
              </div>
              
              {/* Right side - Image */}
              <div className="flex-1 flex justify-center lg:justify-end">
                <div className="w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96">
                  <Image
                    src={reactLogo}
                    alt="Kevin Wang Profile"
                    className="w-full h-full object-cover rounded-xl"
                  />
                </div>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>
    </section>
  );
}