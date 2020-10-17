import dynamic from 'next/dynamic'
const DynamicComponent = dynamic(
  () => import('./components/Radar'), 
  {
    ssr: false
  }
)
export default DynamicComponent;
