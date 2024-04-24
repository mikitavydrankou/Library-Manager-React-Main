import { Link } from 'react-router-dom';

let Navbar = () => {
  return (
    <>
      <nav className='navbar navbar-dark bg-dark navbar-expand-sm'>
        <div className='container'>
          <Link to={'/'} className='navbar-brand'>
            <i className='fa fa-book text-warning' /> Library{' '}
            <span className='text-warning'>Manager</span>
          </Link>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
