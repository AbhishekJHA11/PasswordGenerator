import React, { useCallback, useEffect, useState, useRef } from "react";

const App = () => {
  const [length, setLength] = useState(12);
  const [numberAllowed, setNumberAllowed] = useState(true);
  const [characterAllowed, setCharacterAllowed] = useState(true);
  const [password, setPswd] = useState("");
  const [loading, setLoading] = useState(false);
  const passwordRef = useRef(null);

  // Generate password with simulated delay
  const passwordGenerator = useCallback(() => {
    setLoading(true);
    setTimeout(() => {
      let pass = "";
      let str = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
      if (numberAllowed) str += "0123456789";
      if (characterAllowed) str += "!@#$%^&*()_+[]{}|;:,.<>?";

      for (let i = 0; i < length; i++) {
        const char = Math.floor(Math.random() * str.length);
        pass += str.charAt(char);
      }

      setPswd(pass);
      setLoading(false);
    }, 600); // simulate loading delay
  }, [length, numberAllowed, characterAllowed]);

  useEffect(() => {
    passwordGenerator();
  }, [length, numberAllowed, characterAllowed, passwordGenerator]);

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(password);
  }, [password]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-purple-900 to-black px-4">
      <div className="w-full max-w-lg bg-white/10 backdrop-blur-lg rounded-2xl shadow-lg p-6 text-white">
        <h1 className="text-3xl font-bold text-center mb-6 text-orange-400">
          🔐 Password Generator
        </h1>

        <div className="flex items-center bg-black/30 rounded-lg p-2 mb-4">
          <input
            type="text"
            value={loading ? "Generating..." : password}
            ref={passwordRef}
            readOnly
            className="w-full px-3 py-2 rounded bg-transparent text-white placeholder-gray-300 font-mono text-lg focus:outline-none"
            placeholder="Your secure password"
          />
          <button
            onClick={copyPasswordToClipboard}
            className="ml-2 px-3 py-1 bg-orange-500 hover:bg-orange-600 rounded text-white font-semibold transition"
            disabled={loading}
          >
            Copy
          </button>
        </div>

        {loading && (
          <div className="flex justify-center mb-4">
            <div className="h-6 w-6 border-4 border-white border-t-orange-500 rounded-full animate-spin"></div>
          </div>
        )}

        <div className="grid gap-4 md:grid-cols-2 text-sm">
          <div className="flex flex-col">
            <label htmlFor="length" className="font-medium text-gray-300 mb-1">
              Length: {length}
            </label>
            <input
              id="length"
              type="range"
              min={6}
              max={32}
              value={length}
              onChange={(e) => setLength(Number(e.target.value))}
              className="accent-orange-500"
              disabled={loading}
            />
          </div>

          <div className="flex items-center justify-between">
            <label htmlFor="numberInput" className="text-gray-300 font-medium">
              Include Numbers
            </label>
            <input
              type="checkbox"
              id="numberInput"
              checked={numberAllowed}
              onChange={() => setNumberAllowed((prev) => !prev)}
              className="w-5 h-5 accent-orange-500"
              disabled={loading}
            />
          </div>

          <div className="flex items-center justify-between">
            <label htmlFor="charInput" className="text-gray-300 font-medium">
              Include Special Characters
            </label>
            <input
              type="checkbox"
              id="charInput"
              checked={characterAllowed}
              onChange={() => setCharacterAllowed((prev) => !prev)}
              className="w-5 h-5 accent-orange-500"
              disabled={loading}
            />
          </div>
        </div>

        <button
          onClick={passwordGenerator}
          className={`w-full mt-6 py-2 ${
            loading
              ? "bg-gray-500 cursor-not-allowed"
              : "bg-orange-500 hover:bg-orange-600"
          } rounded-xl text-lg font-bold transition transform hover:scale-105 active:scale-95`}
          disabled={loading}
        >
          🔁 {loading ? "Generating..." : "Generate Password"}
        </button>
      </div>
    </div>
  );
};

export default App;
