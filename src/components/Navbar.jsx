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
    <nav className='fixed top-0 left-0 w-full z-50 bg-gray-900 bg-opacity-80 backdrop-blur-md shadow-md'>
        <div className='max-w-6xl mx-auto flex flex-col sm:flex-row sm:items-center sm:justify-between p-4'>
            <h1 className='text-xl sm:text-2xl font-bold text-green-400 text-center sm:text-left'>Movie Explorer</h1>

            <form onSubmit={handleSubmit} className="relative flex items-center w-full sm:w-auto">
                <input 
                  type='text'
                  placeholder='Search Movies...'
                  value={searchTerm}
                  onChange={handleChange}
                  className='w-full sm:w-64 pl-10 pr-9 py-2 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:outline-none'
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