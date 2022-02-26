import React, { useState } from 'react'
import { Dialog, DialogContent, IconButton, TextField, Button } from "@mui/material";
import { Search } from "@mui/icons-material";

const SearchFriends = () => {
  const [open, setOpen] = useState(false);
  const handleSearch = () => {
  }
  const handleClose = () => {
    setOpen(false)
  }
  const handleOpen = () => {
    setOpen(true)
  }
  return (
    <div>
      <IconButton onClick={handleOpen}>
        <Search />
      </IconButton>
      <Dialog fullWidth maxWidth="sm" open={open} onClose={handleClose}>
        <DialogContent>
          <TextField 
            style={{ width: '100%' }}
            value={name}
            onChange={(e) => setName(e.target.value)}
            variant="outlined"
            placeholder="Enter Friends Name"
          />
          <Button
            style={{ width: '100%', marginTop: '16px' }}
            variant="contained"
            color="primary"
            onClick={handleSearch}
          >
            Search
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default SearchFriends
