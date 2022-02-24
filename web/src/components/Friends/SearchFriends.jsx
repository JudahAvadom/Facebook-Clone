import React, { useState } from 'react'
import { IconButton } from "@mui/material";
import { Search } from "@mui/icons-material";

const SearchFriends = () => {
  const [open, setOpen] = useState(null)
  const handleOpen = () => {
    setOpen(true)
  }
  return (
    <div>
      <IconButton onClick={handleOpen}>
        <Search />
      </IconButton>
    </div>
  )
}

export default SearchFriends
