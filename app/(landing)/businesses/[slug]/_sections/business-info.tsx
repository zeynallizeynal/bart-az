import { OptimizedImage } from "@/components/ui/image";
import { Business } from "@/types/models/business";
import {
  Call,
  CheckBadge,
  ClockFill,
  LocationFill,
} from "@/components/icons/others";
import Link from "next/link";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedin,
  FaTiktok,
  FaXTwitter,
  FaYoutube,
} from "react-icons/fa6";
import { HTMLRenderer } from "@/components/html-renderer";

export default function StoreInfo({ data }: { data: Business }) {
  return (
    <section className="bg-background">
      <div className="space-y-6 bg-background">
        <div className="relative w-full h-60 md:h-80 rounded-xl overflow-hidden">
          <OptimizedImage
            src="/images/elnur_mobile_banner.png"
            alt={data.name}
            loading="lazy"
            variant="fullWidth"
            className="object-cover"
          />
        </div>
        <div className="rounded-xl bg-gray-100 p-5">
          <div className="flex md:flex-row flex-col gap-6">
            <div className="flex gap-5 md:items-center max-w-181 w-full flex-col lg:flex-row">
              <div className="md:size-40 size-16 relative shrink-0">
                <OptimizedImage
                  src="/images/elnur_mobile_profile.png"
                  alt={data.name}
                />
              </div>
              <div className="md:py-3.5">
                <div className="space-y-2">
                  <h4 className="flex items-start text-gray-800">
                    <span className="h-full">{data.name}</span>
                    <CheckBadge size={20} className="text-blue-600" />
                  </h4>
                  <HTMLRenderer
                    className="text-gray-700"
                    html={data.description ?? "NULL"}
                  />
                  <p className="text-gray-700">
                    &#34;WoodMaster&#34; mebel fabriki uzun müddətdir ki,
                    fəaliyyət göstərir. Həm yüksək keyfiyyət, həm də münasib
                    qiymət axtaranların tək ünvanı. Sifarişləri sizin istək və
                    ...
                  </p>
                </div>
                <div className="mt-6 flex items-center gap-1">
                  <LocationFill className="text-blue-500" />
                  <Link
                    href="#"
                    className="text-base text-blue-600 hover:underline underline-offset-2"
                  >
                    Bakı ş., Nəsimi r., Ü.Hacıbəyli küç. 57
                  </Link>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-2 flex-1 justify-center">
              <div className="flex md:flex-row flex-col md:items-center px-4 py-3 gap-3 rounded-xl bg-background">
                <ClockFill className="text-gray-400 shrink-0" />
                <div className="flex items-center gap-3">
                  <p className="text-balance text-gray-800 font-medium">
                    Həftə içi: {data.weekly_work_hour.split("|").join(" - ")}
                  </p>
                  <div className="w-px h-11 bg-gray-200" />
                  <p className="text-gray-800 text-balance font-medium">
                    Həftə sonu: {data.weekend_work_hour.split("|").join(" - ")}
                  </p>
                </div>
              </div>
              <div className="flex items-center px-4 py-3 gap-3 rounded-xl bg-background">
                <Call className="text-gray-400 shrink-0" />
                <div className="flex items-center text-gray-800 gap-3">
                  <Link
                    href={"tel:" + data.phone2}
                    className="hover:underline underline-offset-2"
                    title={`Zəng et: ${data.phone2}`}
                  >
                    {data.phone1}
                  </Link>
                  <div className="w-px last:hidden h-11 bg-gray-200" />
                  {data.phone2 && (
                    <Link
                      href={"tel:" + data.phone2}
                      className="hover:underline underline-offset-2"
                      title={`Zəng et: ${data.phone2}`}
                    >
                      {data.phone2}
                    </Link>
                  )}
                </div>
              </div>
              <div className="flex items-center flex-wrap gap-2.5 md:justify-between text-blue-600">
                <Link
                  href="#"
                  className="rounded-lg grow bg-background size-12 inline-flex text-xl items-center justify-center hover:bg-gray-50 transition"
                >
                  <FaFacebookF />
                </Link>
                <Link
                  href="#"
                  className="rounded-lg grow bg-background size-12 inline-flex text-xl items-center justify-center hover:bg-gray-50 transition"
                >
                  <FaInstagram />
                </Link>
                <Link
                  href="#"
                  className="rounded-lg grow bg-background size-12 inline-flex text-xl items-center justify-center hover:bg-gray-50 transition"
                >
                  <FaXTwitter />
                </Link>
                <Link
                  href="#"
                  className="rounded-lg grow bg-background size-12 inline-flex text-xl items-center justify-center hover:bg-gray-50 transition"
                >
                  <FaYoutube />
                </Link>
                <Link
                  href="#"
                  className="rounded-lg grow bg-background size-12 inline-flex text-xl items-center justify-center hover:bg-gray-50 transition"
                >
                  <FaTiktok />
                </Link>
                <Link
                  href="#"
                  className="rounded-lg grow bg-background size-12 inline-flex text-xl items-center justify-center hover:bg-gray-50 transition"
                >
                  <FaLinkedin />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
