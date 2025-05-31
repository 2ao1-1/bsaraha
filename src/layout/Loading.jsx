const Loader = () => {
  return (
    <div className="relative w-[200px] h-[60px] z-[1] mx-auto">
      {/* Circles */}
      <div className="absolute w-5 h-5 rounded-full bg-white left-[15%] animate-circle7124" />
      <div className="absolute w-5 h-5 rounded-full bg-white left-[45%] animate-circle7124 delay-[200ms]" />
      <div className="absolute w-5 h-5 rounded-full bg-white right-[15%] animate-circle7124 delay-[300ms]" />

      {/* Shadows */}
      <div className="absolute w-5 h-1 rounded-full bg-black/90 top-[62px] blur-sm left-[15%] z-[-1] animate-shadow046" />
      <div className="absolute w-5 h-1 rounded-full bg-black/90 top-[62px] blur-sm left-[45%] z-[-1] animate-shadow046 delay-[200ms]" />
      <div className="absolute w-5 h-1 rounded-full bg-black/90 top-[62px] blur-sm right-[15%] z-[-1] animate-shadow046 delay-[300ms]" />
    </div>
  );
};

export default Loader;
