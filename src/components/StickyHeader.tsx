import React, { useEffect,useState } from 'react'
import { ReactDOM } from 'react'

const MyApp = () => {
   const [stickyNav, setStickyNav] = useState(false)

   const handleScroll = () => {
      window.pageYOffset >= 100 ? setStickyNav(true) : setStickyNav(false)
   }

   useEffect(() => {
      window.addEventListener('scroll', handleScroll)
      return () => window.addEventListener('scroll', handleScroll)
   })

   return (
      <>
         <nav className={stickyNav ? 'active' : ''}>
            <Logo />
            <List />
         </nav>
         <Text />
      </>
   )
}
const Logo = () => {
   return (
      <div className="navbar_logo">
         <img
            src="https://images.unsplash.com/photo-1547987523-f132f72f9b43?crop=entropy&cs=tinysrgb&fm=jpg&ixid=MnwzMjM4NDZ8MHwxfHJhbmRvbXx8fHx8fHx8fDE2NjI3Mjg4NTM&ixlib=rb-1.2.1&q=80"
            alt="underground logo"
         />
      </div>
   )
}
const List = () => {
   return (
      <ul className="navbar_list">
         <li>
            <a href="#">Home</a>
         </li>
         <li>
            <a href="#">About</a>
         </li>
         <li>
            <a href="#">Contact</a>
         </li>
      </ul>
   )
}
const Text = () => {
   return (
      <div className="text">
         <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras iaculis lacinia libero, ac semper quam
            faucibus dignissim. Nunc id elementum tortor, a tincidunt ligula. Phasellus quis imperdiet dui. Maecenas
            porta, est quis dapibus blandit, lorem justo blandit sem, in rhoncus est lectus eu velit. Nunc quis risus id
            magna faucibus varius. Nullam eu ultrices justo. Interdum et malesuada fames ac ante ipsum primis in
            faucibus. Curabitur magna erat, porta vitae metus ac, efficitur ultrices metus. Suspendisse molestie
            consectetur dignissim.
         </p>

         <p>
            Curabitur non auctor dolor. Proin arcu elit, ultricies et sem nec, ornare suscipit orci. Fusce ac suscipit
            est. Donec mattis id lacus sit amet tincidunt. Nunc enim leo, congue sed tellus vitae, rhoncus aliquam odio.
            Nam sit amet porta nisl. Nam ullamcorper id ex a convallis. Maecenas tempor imperdiet aliquam. Quisque erat
            nunc, tincidunt quis eros quis, congue dapibus diam. Sed sit amet accumsan libero. Maecenas dictum enim eget
            justo tristique tempus. Aenean vitae nisl eu orci auctor suscipit non eu urna.
         </p>
         <p>
            Curabitur non auctor dolor. Proin arcu elit, ultricies et sem nec, ornare suscipit orci. Fusce ac suscipit
            est. Donec mattis id lacus sit amet tincidunt. Nunc enim leo, congue sed tellus vitae, rhoncus aliquam odio.
            Nam sit amet porta nisl. Nam ullamcorper id ex a convallis. Maecenas tempor imperdiet aliquam. Quisque erat
            nunc, tincidunt quis eros quis, congue dapibus diam. Sed sit amet accumsan libero. Maecenas dictum enim eget
            justo tristique tempus. Aenean vitae nisl eu orci auctor suscipit non eu urna.
         </p>
         <p>
            Curabitur non auctor dolor. Proin arcu elit, ultricies et sem nec, ornare suscipit orci. Fusce ac suscipit
            est. Donec mattis id lacus sit amet tincidunt. Nunc enim leo, congue sed tellus vitae, rhoncus aliquam odio.
            Nam sit amet porta nisl. Nam ullamcorper id ex a convallis. Maecenas tempor imperdiet aliquam. Quisque erat
            nunc, tincidunt quis eros quis, congue dapibus diam. Sed sit amet accumsan libero. Maecenas dictum enim eget
            justo tristique tempus. Aenean vitae nisl eu orci auctor suscipit non eu urna.
         </p>
         <p>
            Curabitur non auctor dolor. Proin arcu elit, ultricies et sem nec, ornare suscipit orci. Fusce ac suscipit
            est. Donec mattis id lacus sit amet tincidunt. Nunc enim leo, congue sed tellus vitae, rhoncus aliquam odio.
            Nam sit amet porta nisl. Nam ullamcorper id ex a convallis. Maecenas tempor imperdiet aliquam. Quisque erat
            nunc, tincidunt quis eros quis, congue dapibus diam. Sed sit amet accumsan libero. Maecenas dictum enim eget
            justo tristique tempus. Aenean vitae nisl eu orci auctor suscipit non eu urna.
         </p>
         <p>
            Curabitur non auctor dolor. Proin arcu elit, ultricies et sem nec, ornare suscipit orci. Fusce ac suscipit
            est. Donec mattis id lacus sit amet tincidunt. Nunc enim leo, congue sed tellus vitae, rhoncus aliquam odio.
            Nam sit amet porta nisl. Nam ullamcorper id ex a convallis. Maecenas tempor imperdiet aliquam. Quisque erat
            nunc, tincidunt quis eros quis, congue dapibus diam. Sed sit amet accumsan libero. Maecenas dictum enim eget
            justo tristique tempus. Aenean vitae nisl eu orci auctor suscipit non eu urna.
         </p>
         <p>
            Curabitur non auctor dolor. Proin arcu elit, ultricies et sem nec, ornare suscipit orci. Fusce ac suscipit
            est. Donec mattis id lacus sit amet tincidunt. Nunc enim leo, congue sed tellus vitae, rhoncus aliquam odio.
            Nam sit amet porta nisl. Nam ullamcorper id ex a convallis. Maecenas tempor imperdiet aliquam. Quisque erat
            nunc, tincidunt quis eros quis, congue dapibus diam. Sed sit amet accumsan libero. Maecenas dictum enim eget
            justo tristique tempus. Aenean vitae nisl eu orci auctor suscipit non eu urna.
         </p>
         <p>
            Curabitur non auctor dolor. Proin arcu elit, ultricies et sem nec, ornare suscipit orci. Fusce ac suscipit
            est. Donec mattis id lacus sit amet tincidunt. Nunc enim leo, congue sed tellus vitae, rhoncus aliquam odio.
            Nam sit amet porta nisl. Nam ullamcorper id ex a convallis. Maecenas tempor imperdiet aliquam. Quisque erat
            nunc, tincidunt quis eros quis, congue dapibus diam. Sed sit amet accumsan libero. Maecenas dictum enim eget
            justo tristique tempus. Aenean vitae nisl eu orci auctor suscipit non eu urna.
         </p>
         <p>
            Curabitur non auctor dolor. Proin arcu elit, ultricies et sem nec, ornare suscipit orci. Fusce ac suscipit
            est. Donec mattis id lacus sit amet tincidunt. Nunc enim leo, congue sed tellus vitae, rhoncus aliquam odio.
            Nam sit amet porta nisl. Nam ullamcorper id ex a convallis. Maecenas tempor imperdiet aliquam. Quisque erat
            nunc, tincidunt quis eros quis, congue dapibus diam. Sed sit amet accumsan libero. Maecenas dictum enim eget
            justo tristique tempus. Aenean vitae nisl eu orci auctor suscipit non eu urna.
         </p>
         <p>
            Curabitur non auctor dolor. Proin arcu elit, ultricies et sem nec, ornare suscipit orci. Fusce ac suscipit
            est. Donec mattis id lacus sit amet tincidunt. Nunc enim leo, congue sed tellus vitae.
         </p>
      </div>
   )
}
import ReactDOM.render(<MyApp />, document.querySelector('#app'))
