/**
 * Credit: https://github.com/trizmo/DynamicSVG
 */

/**
 * `DynamicSVG` is a React component for fetching, dynamically manipulating, and rendering SVG images.
 * It allows for the modification of SVG attributes such as `fill`, `stroke`, `width`, and `height`,
 * based on the provided props. This component uses a base64 data URL to embed the modified SVG
 * directly into an image element, which is then optimized using Next.js's `Image` component.
 *
 * Props:
 * - `filePath`: String. The URL path to the SVG file. Required.
 * - `size`: Number (optional, default = 24). The width and height to set for the SVG element. This size is also used for the container.
 * - `color`: String (optional). The color value (e.g., '#FF0000', 'red') to apply to the SVG's `fill` and `stroke` attributes, if they are not set to 'none'.
 *
 * Example Usage:
 *
 * ```jsx
 * import DynamicSVG from './DynamicSVG'; // Adjust the import path based on your file structure
 *
 * const MyComponent = () => {
 *   return (
 *     <div>
 *       <DynamicSVG
 *         filePath="https://example.com/path/to/your.svg"
 *         size={48}
 *         color="#00FF00"
 *       />
 *     </div>
 *   );
 * }
 * ```
 *
 * This component fetches the SVG from the specified `filePath`, applies the `color` to elements within the SVG
 * (except those with `fill` or `stroke` explicitly set to 'none'), adjusts the `width` and `height` to the specified `size`,
 * and renders the modified SVG within an image optimized by Next.js's `Image` component.
 */

'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'

type DynamicSVGProps = {
  filePath: string
  color?: string
  size?: number
  alt?: string
  className?: string
  unoptimized?: boolean
}

export function DynamicSVG({
  filePath,
  size = 16,
  color = 'currentColor',
  alt = 'Dynamic SVG',
  className,
  unoptimized,
}: DynamicSVGProps) {
  const [svgDataUrl, setSvgDataUrl] = useState('')

  useEffect(() => {
    fetch(filePath)
      .then((response) => response.text())
      .then((data) => {
        const parser = new DOMParser()
        const xmlDoc = parser.parseFromString(data, 'image/svg+xml')

        xmlDoc.querySelectorAll('script').forEach((script) => script.remove())

        xmlDoc.querySelectorAll('*').forEach((el) => {
          const ElementAttributes = el
            .getAttributeNames()
            .map((k) => ({ name: k, value: el.getAttribute(k) }))

          ElementAttributes.forEach((attr) => {
            if (attr.name.startsWith('on')) {
              el.removeAttribute(attr.name)
            }
          })

          if (el.hasAttribute('fill') && el.getAttribute('fill')!.toLowerCase() !== 'none') {
            el.setAttribute('fill', color)
          }

          if (el.hasAttribute('stroke') && el.getAttribute('stroke')!.toLowerCase() !== 'none') {
            el.setAttribute('stroke', color)
          }

          if (el.hasAttribute('width') && el.getAttribute('width')!.toLowerCase() !== 'none') {
            el.setAttribute('width', `${size}px`)
          }

          if (el.hasAttribute('height') && el.getAttribute('height')!.toLowerCase() !== 'none') {
            el.setAttribute('height', `${size}px`)
          }
        })

        const serializer = new XMLSerializer()
        const serializedSVG = serializer.serializeToString(xmlDoc.documentElement)
        const svgBase64 = window.btoa(serializedSVG)
        const svgDataUrl = `data:image/svg+xml;base64,${svgBase64}`
        setSvgDataUrl(svgDataUrl)
      })
      .catch((error) => console.error('Failed to fetch SVG:', error))
  }, [filePath, color, size])

  // Use a div to maintain the aspect ratio if necessary or directly use the Image component
  return (
    <span className={className} style={{ width: size, height: size, position: 'relative' }}>
      {svgDataUrl && (
        <Image
          src={svgDataUrl}
          alt={alt}
          fill
          className="object-contain"
          unoptimized={unoptimized}
        />
      )}
    </span>
  )
}
