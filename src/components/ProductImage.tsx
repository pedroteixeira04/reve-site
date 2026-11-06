import { useState } from 'react';
import Icon from './Icon';
import type { IconName } from '../data';
import { productImages } from '../productImages';

const fallback: Record<string, IconName> = {
  reve: 'sleep',
  capa: 'design',
  gel: 'temp',
  aroma: 'leaf',
  premium: 'app'
};

export default function ProductImage({ id, name }: { id: string; name: string }) {
  const [failed, setFailed] = useState(false);
  const src = productImages[id];

  if (!src || failed) {
    return (
      <div className="pimg placeholder" role="img" aria-label={name}>
        <Icon name={fallback[id] ?? 'sleep'} size={44} />
      </div>
    );
  }
  return <img className="pimg" src={src} alt={name} loading="lazy" onError={() => setFailed(true)} />;
}
