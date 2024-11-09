const App = () => {

  return (
    <div>
      <div className='mt-12'>
        <h1 className='flex justify-center mb-24 text-6xl'>Welcome</h1>
      </div>
      <div className='grid gap-4 justify-center'>
        <a href='/wheeloffortune' className='btn w-48 h-14 btn-secondary text-lg'>Wheel of Fortune</a>
        <div className='btn w-48 h-14 btn-secondary'></div>
        <div className='btn w-48 h-14 btn-secondary'></div>
      </div>
    </div>
  );
}

export default App
