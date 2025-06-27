"use client"

import { useState, useRef, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Download, Shuffle, Sparkles } from "lucide-react"
// 在文件顶部添加html2canvas的导入注释，因为这个包需要在部署时安装
// 将html2canvas的导入改为动态导入以避免SSR问题
// import html2canvas from "html2canvas"

interface ArtStyle {
  background: string
  clipPath: string
  filter: string
  transform: string
  animation: string
  blendMode: string
}

export default function CSSArtGenerator() {
  const [artStyles, setArtStyles] = useState<ArtStyle[]>([])
  const [isGenerating, setIsGenerating] = useState(false)
  const artRef = useRef<HTMLDivElement>(null)

  // 随机颜色生成器
  const getRandomColor = () => {
    const colors = [
      "#FF6B6B",
      "#4ECDC4",
      "#45B7D1",
      "#96CEB4",
      "#FFEAA7",
      "#DDA0DD",
      "#98D8C8",
      "#F7DC6F",
      "#BB8FCE",
      "#85C1E9",
      "#F8C471",
      "#82E0AA",
      "#F1948A",
      "#85C1E9",
      "#D7BDE2",
    ]
    return colors[Math.floor(Math.random() * colors.length)]
  }

  // 生成随机渐变
  const generateGradient = () => {
    const gradientTypes = ["linear", "radial", "conic"]
    const type = gradientTypes[Math.floor(Math.random() * gradientTypes.length)]
    const color1 = getRandomColor()
    const color2 = getRandomColor()
    const color3 = getRandomColor()

    if (type === "linear") {
      const angle = Math.floor(Math.random() * 360)
      return `linear-gradient(${angle}deg, ${color1}, ${color2}, ${color3})`
    } else if (type === "radial") {
      const position = ["circle", "ellipse"][Math.floor(Math.random() * 2)]
      return `radial-gradient(${position}, ${color1}, ${color2}, ${color3})`
    } else {
      const angle = Math.floor(Math.random() * 360)
      return `conic-gradient(from ${angle}deg, ${color1}, ${color2}, ${color3})`
    }
  }

  // 生成随机多边形路径
  const generateClipPath = () => {
    const shapes = [
      // 三角形
      () =>
        `polygon(${Math.random() * 100}% ${Math.random() * 100}%, ${Math.random() * 100}% ${Math.random() * 100}%, ${Math.random() * 100}% ${Math.random() * 100}%)`,
      // 四边形
      () =>
        `polygon(${Math.random() * 100}% ${Math.random() * 100}%, ${Math.random() * 100}% ${Math.random() * 100}%, ${Math.random() * 100}% ${Math.random() * 100}%, ${Math.random() * 100}% ${Math.random() * 100}%)`,
      // 圆形
      () => `circle(${20 + Math.random() * 30}% at ${Math.random() * 100}% ${Math.random() * 100}%)`,
      // 椭圆
      () =>
        `ellipse(${20 + Math.random() * 30}% ${20 + Math.random() * 30}% at ${Math.random() * 100}% ${Math.random() * 100}%)`,
      // 复杂多边形
      () => {
        const points = []
        for (let i = 0; i < 6; i++) {
          points.push(`${Math.random() * 100}% ${Math.random() * 100}%`)
        }
        return `polygon(${points.join(", ")})`
      },
    ]

    const shape = shapes[Math.floor(Math.random() * shapes.length)]
    return shape()
  }

  // 生成随机滤镜
  const generateFilter = () => {
    const filters = []

    // 随机添加不同的滤镜效果
    if (Math.random() > 0.5) filters.push(`blur(${Math.random() * 3}px)`)
    if (Math.random() > 0.5) filters.push(`brightness(${0.8 + Math.random() * 0.4})`)
    if (Math.random() > 0.5) filters.push(`contrast(${0.8 + Math.random() * 0.6})`)
    if (Math.random() > 0.5) filters.push(`saturate(${0.5 + Math.random() * 1.5})`)
    if (Math.random() > 0.5) filters.push(`hue-rotate(${Math.random() * 360}deg)`)
    if (Math.random() > 0.7)
      filters.push(
        `drop-shadow(${Math.random() * 10}px ${Math.random() * 10}px ${Math.random() * 20}px rgba(0,0,0,0.3))`,
      )

    return filters.join(" ")
  }

  // 生成随机变换
  const generateTransform = () => {
    const transforms = []

    transforms.push(`rotate(${Math.random() * 360}deg)`)
    transforms.push(`scale(${0.5 + Math.random() * 1})`)
    transforms.push(`skew(${Math.random() * 30}deg, ${Math.random() * 30}deg)`)

    return transforms.join(" ")
  }

  // 生成随机动画
  const generateAnimation = () => {
    const animations = [
      "spin 10s linear infinite",
      "pulse 3s ease-in-out infinite",
      "bounce 2s ease-in-out infinite",
      "float 4s ease-in-out infinite",
      "glow 2s ease-in-out infinite alternate",
    ]

    if (Math.random() > 0.6) {
      return animations[Math.floor(Math.random() * animations.length)]
    }
    return ""
  }

  // 生成混合模式
  const generateBlendMode = () => {
    const modes = [
      "normal",
      "multiply",
      "screen",
      "overlay",
      "soft-light",
      "hard-light",
      "color-dodge",
      "color-burn",
      "difference",
      "exclusion",
    ]
    return modes[Math.floor(Math.random() * modes.length)]
  }

  // 生成艺术作品
  const generateArt = useCallback(() => {
    setIsGenerating(true)

    setTimeout(() => {
      const newStyles: ArtStyle[] = []
      const layerCount = 3 + Math.floor(Math.random() * 5) // 3-7层

      for (let i = 0; i < layerCount; i++) {
        newStyles.push({
          background: generateGradient(),
          clipPath: generateClipPath(),
          filter: generateFilter(),
          transform: generateTransform(),
          animation: generateAnimation(),
          blendMode: generateBlendMode(),
        })
      }

      setArtStyles(newStyles)
      setIsGenerating(false)
    }, 500)
  }, [])

  // 下载PNG
  const downloadPNG = async () => {
    if (!artRef.current) return

    try {
      // 动态导入html2canvas以避免SSR问题
      const html2canvas = (await import("html2canvas")).default

      const canvas = await html2canvas(artRef.current, {
        backgroundColor: "#000000",
        scale: 2,
        width: 800,
        height: 800,
      })

      const link = document.createElement("a")
      link.download = `css-art-${Date.now()}.png`
      link.href = canvas.toDataURL()
      link.click()
    } catch (error) {
      console.error("下载失败:", error)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 p-4">
      <div className="max-w-4xl mx-auto">
        {/* 标题 */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2 flex items-center justify-center gap-2">
            <Sparkles className="w-8 h-8 text-yellow-400" />
            CSS Art 生成器
            <Sparkles className="w-8 h-8 text-yellow-400" />
          </h1>
          <p className="text-gray-300">点击生成按钮，创造独一无二的抽象艺术作品</p>
        </div>

        {/* 控制按钮 */}
        <div className="flex justify-center gap-4 mb-8">
          <Button
            onClick={generateArt}
            disabled={isGenerating}
            className="bg-gradient-to-r from-pink-500 to-violet-500 hover:from-pink-600 hover:to-violet-600 text-white px-8 py-3 text-lg"
          >
            <Shuffle className="w-5 h-5 mr-2" />
            {isGenerating ? "生成中..." : "生成艺术"}
          </Button>

          {artStyles.length > 0 && (
            <Button
              onClick={downloadPNG}
              variant="outline"
              className="bg-white/10 border-white/20 text-white hover:bg-white/20 px-8 py-3 text-lg"
            >
              <Download className="w-5 h-5 mr-2" />
              下载 PNG
            </Button>
          )}
        </div>

        {/* 艺术作品展示 */}
        <Card className="p-8 bg-black/20 backdrop-blur-sm border-white/10">
          <div
            ref={artRef}
            className="relative w-full aspect-square max-w-2xl mx-auto bg-black rounded-lg overflow-hidden"
            style={{ minHeight: "400px" }}
          >
            {artStyles.length === 0 ? (
              <div className="flex items-center justify-center h-full text-gray-400 text-xl">
                点击"生成艺术"开始创作
              </div>
            ) : (
              artStyles.map((style, index) => (
                <div
                  key={index}
                  className="absolute inset-0"
                  style={{
                    background: style.background,
                    clipPath: style.clipPath,
                    filter: style.filter,
                    transform: style.transform,
                    animation: style.animation,
                    mixBlendMode: style.blendMode as any,
                    opacity: 0.7 + Math.random() * 0.3,
                  }}
                />
              ))
            )}
          </div>
        </Card>

        {/* 说明文字 */}
        <div className="text-center mt-8 text-gray-300">
          <p className="mb-2">每次生成的作品都是独一无二的！</p>
          <p className="text-sm">使用了多边形裁剪、渐变背景、CSS滤镜等技术创造抽象艺术</p>
        </div>
      </div>

      {/* CSS 动画定义 */}
      <style jsx>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        @keyframes pulse {
          0%, 100% { opacity: 0.7; }
          50% { opacity: 1; }
        }
        
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        
        @keyframes glow {
          from { filter: brightness(1) saturate(1); }
          to { filter: brightness(1.2) saturate(1.5); }
        }
      `}</style>
    </div>
  )
}
