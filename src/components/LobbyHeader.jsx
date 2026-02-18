import { useState } from "react";
import { asset } from "../utils";

export default function LobbyHeader() {
  const [btnText, setBtnText] = useState("INVITE");

  const handleInvite = () => {
    navigator.clipboard.writeText(window.location.href).then(() => {
      setBtnText("LINK COPIED!");
      setTimeout(() => setBtnText("INVITE"), 2000);
    });
  };

  return (
    <div className="flex items-center justify-between px-10 py-5 bg-linear-to-b from-[rgba(10,20,40,0.95)] to-[rgba(10,20,40,0.8)] border-b border-lol-border max-md:flex-col max-md:gap-3 max-md:px-5 max-md:py-4">
      <div className="flex items-center gap-4">
        {/* Crest */}
        <div className="w-14 h-14 border-2 border-lol-gold-dark rounded-full flex items-center justify-center bg-lol-blue-mid overflow-hidden">
          <img
            src={asset("/images/icons/poro.gif")}
            alt="crest"
            className="w-full h-full object-cover"
          />
        </div>
        <div>
          <h1 className="text-[22px] font-bold tracking-wider uppercase text-lol-gold-light max-md:text-base">
            的马西啊&apos;S BIRTHDAY
          </h1>
          <p className="text-xs text-lol-grey tracking-wide mt-0.5">
            ARAM
            <span className="mx-1.5">•</span> 5v5{" "}
            <span className="mx-1.5">•</span> Blind Pick
          </p>
        </div>
      </div>

      <button
        onClick={handleInvite}
        className="px-8 py-2.5 border-2 border-lol-gold bg-transparent text-lol-gold text-sm font-bold tracking-wider uppercase cursor-pointer transition-all hover:bg-lol-gold/15"
      >
        {btnText}
      </button>
    </div>
  );
}
