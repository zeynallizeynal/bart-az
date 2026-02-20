import Link from "next/link";
import Image from "next/image";

const items = [
  "yüngül lehimli disklər",
  "ABS",
  "lyuk",
  "yağış sensoru",
  "mərkəzi qapanma",
  "planşetlər",
  "maqnitola",
  "ps3 oyunları",
  "apple notebook",
  "telefon",
  "lg notebook",
  "fotoaparatların satışı",
  "proqramlar",
  "daşınmaz əmlak",
  "torpaq satılır",
  "playstation 3 satılır",
  "chevrolet",
  "lorem ipsum",
  "yüngül lehimli disklər",
  "ABS",
  "lyuk",
  "yağış sensoru",
  "mərkəzi qapanma",
  "planşetlər",
  "maqnitola",
  "ps3 oyunları",
  "apple notebook",
  "telefon",
  "lg notebook",
  "fotoaparatların satışı",
  "proqramlar",
  "daşınmaz əmlak",
  "torpaq satılır",
  "playstation 3 satılır",
  "chevrolet",
  "lorem ipsum",
  "yüngül lehimli disklər",
  "ABS",
  "lyuk",
];

export default function PopularSearches() {
  return (
    <section className='md:py-16 py-3 container'>
      <h3 className='flex items-center md:gap-4 gap-2'>
        <span className='relative md:size-10 size-8'>
          <Image
            src='/images/icons/zoom.svg'
            fill
            alt='Populyar axtarışlar'
            quality={100}
          />
        </span>{" "}
        Populyar axtarışlar
      </h3>
      <div className='flex md:flex-wrap justify-start gap-3 md:mt-10 mt-6 overflow-auto'>
        {items.map((item, index) => (
          <Link
            key={index}
            href='/'
            className='px-4 shrink-0 h-[38px] inline-flex items-center rounded-md bg-gray-100 text-gray-800 hover:bg-gray-200 transition'
          >
            {item}
          </Link>
        ))}
      </div>
    </section>
  );
}
