import dynamic from 'next/dynamic'
const DynamicComponent = dynamic(
  () => import('./components/Polar'), 
  {
    ssr: false
  }
)
export default DynamicComponent;
