import { useState } from "react";
import { Search } from "lucide-react";

const Navbar = ({ onSearch }) => {
    const [searchTerm, setSearchTerm] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        onSearch(searchTerm);
        setSearchTerm(""); // clear input after searching
    }

    const handleChange = (e) => {
      const value = e.target.value;
      setSearchTerm(value);

      // if cleared, reset movies
      if (value.trim() === "") {
        onSearch("");
      }
    }

  return (
    <nav className='sticky top-0 z-50 bg-gray-900 bg-opacity-80 backdrop-blur-md shadow-md'>
        <div className='max-w-6xl mx-auto flex items-center justify-between p-4'>
            <h1 className='text-2xl font-bold text-green-400'>Movie Explorer</h1>

            <form onSubmit={handleSubmit} className="relative flex items-center">
                <input 
                  type='text'
                  placeholder='Search Movies...'
                  value={searchTerm}
                  onChange={handleChange}
                  className='pl-10 pr-9 py-1 rounded-lg bg-gray-800 text-white focus:outline-none'
            />
            <button
              type="submit"
              className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
            >
                <Search className="w-5 h-5"/>
            </button>
            </form>
        </div>
    </nav>
  )
}

export default Navbar