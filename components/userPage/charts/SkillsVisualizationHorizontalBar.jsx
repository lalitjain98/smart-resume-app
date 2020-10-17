import dynamic from 'next/dynamic'
const DynamicComponent = dynamic(
  () => import('./components/HorizontalBar'), 
  {
    ssr: false
  }
)
export default DynamicComponent;
