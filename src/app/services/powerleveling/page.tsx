"use client"

import { useState } from "react"
import { Button } from "@/components/ui/Button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card"
import { Input } from "@/components/ui/Input"
import { ChevronsUp, Shield, ChevronRight, Check, ArrowLeft, Target, Calculator } from "lucide-react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import Link from "next/link"
import Image from "next/image"

const TANK_TYPES = [
  { id: "lt", label: "Light Tanks (LT)", description: "Fast scouts with excellent view range" },
  { id: "mt", label: "Medium Tanks (MT)", description: "Versatile all-rounders" },
  { id: "ht", label: "Heavy Tanks (HT)", description: "Heavily armored frontline warriors" },
  { id: "td", label: "Tank Destroyers (TD)", description: "Long-range damage dealers" },
  { id: "spg", label: "SPG (Artillery)", description: "Indirect fire support" },
]

const PRICE_PER_TYPE = 100

const orderFormSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  discordTag: z.string().min(3, { message: "Please enter your Discord tag" }),
  tankType: z.string().min(1, { message: "Please select a tank type" }),
  server: z.string().min(1, { message: "Please select a server" }),
  additionalInfo: z.string().optional(),
})

export default function PowerlevelingPage() {
  const [selectedTankType, setSelectedTankType] = useState<string | null>(null)

  const form = useForm<z.infer<typeof orderFormSchema>>({
    resolver: zodResolver(orderFormSchema),
    defaultValues: {
      email: "",
      discordTag: "",
      tankType: "",
      server: "",
      additionalInfo: "",
    },
  })

  // Update form value when selection changes
  const handleTankTypeSelect = (id: string) => {
    setSelectedTankType(id)
    form.setValue("tankType", id)
  }

  function onSubmit(values: z.infer<typeof orderFormSchema>) {
    const selectedTypeLabel = TANK_TYPES.find(t => t.id === values.tankType)?.label
    
    const orderData = {
      ...values,
      price: PRICE_PER_TYPE,
      tankTypeLabel: selectedTypeLabel
    }
    
    console.log(orderData)
    alert(`Order submitted!\n\nTank Type: ${selectedTypeLabel}\nPrice: $${PRICE_PER_TYPE}\n\nWe will contact you within 30 minutes.`)
  }

  return (
    <>
      <Header />
      <div className="min-h-screen bg-background text-foreground overflow-x-hidden pt-20">
        
        {/* Hero Section */}
        <section className="relative py-16 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/20 via-background to-background opacity-50" />
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto">
              <Link href="/" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-6 transition-colors">
                <ArrowLeft className="h-4 w-4 mr-1" />
                Back to Home
              </Link>
              <div className="flex items-center gap-3 mb-4">
                <ChevronsUp className="h-10 w-10 text-primary" />
                <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
                  Powerleveling Service
                </h1>
              </div>
              <p className="text-lg text-muted-foreground mb-6">
                Rapidly level up your tanks from Tier I to Tier X with our professional boosting service
              </p>
              <Button 
                size="lg" 
                className="text-lg px-8"
                onClick={() => document.getElementById('calculator')?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
              >
                <Calculator className="mr-2 h-5 w-5" />
                Start Your Order
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-12 bg-secondary/20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-8 text-center">How It Works</h2>
              <div className="grid md:grid-cols-3 gap-6">
                <Card className="border-border bg-card text-center">
                  <CardHeader>
                    <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center text-2xl font-bold mx-auto mb-3">
                      1
                    </div>
                    <CardTitle className="text-lg">Select Tank Type</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground text-sm">
                      Choose which tank class you want to level from Tier I to Tier X.
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-border bg-card text-center">
                  <CardHeader>
                    <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center text-2xl font-bold mx-auto mb-3">
                      2
                    </div>
                    <CardTitle className="text-lg">Expert Grinding</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground text-sm">
                      Our professional players efficiently grind through each tier of your tech tree.
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-border bg-card text-center">
                  <CardHeader>
                    <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center text-2xl font-bold mx-auto mb-3">
                      3
                    </div>
                    <CardTitle className="text-lg">Enjoy Tier X</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground text-sm">
                      Skip the grind and start playing your desired Tier X tank immediately!
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Main Booking Section */}
        <section id="calculator" className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <div className="grid lg:grid-cols-2 gap-8">
                
                {/* Left Column - Selection */}
                <div>
                  <div className="text-left mb-8">
                    <h2 className="text-3xl font-bold mb-2">Choose Tank Type</h2>
                    <p className="text-muted-foreground">
                      Select the tank class you want to powerlevel
                    </p>
                  </div>

                  <div className="space-y-4 mb-8">
                    {TANK_TYPES.map((tankType) => (
                      <button
                        key={tankType.id}
                        onClick={() => handleTankTypeSelect(tankType.id)}
                        className={`w-full p-4 rounded-lg border-2 transition-all text-left ${
                          selectedTankType === tankType.id
                            ? 'border-primary bg-primary/10 shadow-lg'
                            : 'border-border hover:border-primary/50 bg-card'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="text-lg font-semibold">{tankType.label}</h3>
                            <p className="text-sm text-muted-foreground">{tankType.description}</p>
                          </div>
                          <div className="flex items-center gap-4">
                            <span className="font-bold text-primary">${PRICE_PER_TYPE}</span>
                            {selectedTankType === tankType.id && (
                              <Check className="h-6 w-6 text-primary flex-shrink-0" />
                            )}
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>

                  {/* Something Else Option */}
                  <Card className="border-2 border-dashed border-border hover:border-primary/50 transition-colors">
                    <CardHeader className="p-4">
                      <CardTitle className="text-lg">Something Else?</CardTitle>
                      <CardDescription>
                        Need experience farming for specific tanks?
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="p-4 pt-0">
                      <Button asChild variant="outline" className="w-full">
                        <Link href="#exp-farm">
                          Go to EXP Farm Service
                          <ChevronRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                </div>

                {/* Right Column - Order Form */}
                <div>
                  <Card className="border-border bg-card sticky top-24">
                    <CardHeader>
                      <CardTitle className="text-2xl">Complete Your Order</CardTitle>
                      <CardDescription>Fill in your details to get started</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        
                        {/* Email */}
                        <div className="space-y-2">
                          <label htmlFor="email" className="text-sm font-medium">Email Address *</label>
                          <Input
                            id="email"
                            type="email"
                            placeholder="your@email.com"
                            {...form.register("email")}
                            className="bg-background"
                          />
                          {form.formState.errors.email && (
                            <p className="text-sm text-red-500">{form.formState.errors.email.message}</p>
                          )}
                        </div>

                        {/* Discord Tag */}
                        <div className="space-y-2">
                          <label htmlFor="discordTag" className="text-sm font-medium">Discord Tag *</label>
                          <Input
                            id="discordTag"
                            placeholder="Username#1234"
                            {...form.register("discordTag")}
                            className="bg-background"
                          />
                          {form.formState.errors.discordTag && (
                            <p className="text-sm text-red-500">{form.formState.errors.discordTag.message}</p>
                          )}
                        </div>

                        {/* Server */}
                        <div className="space-y-2">
                          <label htmlFor="server" className="text-sm font-medium">Server *</label>
                          <select
                            id="server"
                            {...form.register("server")}
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                          >
                            <option value="">Select server...</option>
                            <option value="na">North America</option>
                            <option value="eu">Europe</option>
                            <option value="asia">Asia</option>
                            <option value="ru">Russia</option>
                          </select>
                          {form.formState.errors.server && (
                            <p className="text-sm text-red-500">{form.formState.errors.server.message}</p>
                          )}
                        </div>

                        {/* Hidden fields */}
                        <input type="hidden" {...form.register("tankType")} value={selectedTankType || ""} />

                        {/* Order Summary */}
                        <div className="bg-secondary/20 rounded-lg p-4 space-y-2">
                          <div className="text-sm font-semibold mb-2">Order Summary:</div>
                          <div className="space-y-1 text-sm">
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Service:</span>
                              <span className="font-medium">Powerleveling (1-10)</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Tank Type:</span>
                              <span className="font-medium">
                                {selectedTankType 
                                  ? TANK_TYPES.find(t => t.id === selectedTankType)?.label 
                                  : <span className="text-muted-foreground italic">Select a type...</span>}
                              </span>
                            </div>
                            <div className="flex justify-between border-t border-border pt-2 mt-2">
                              <span className="text-muted-foreground">Total Cost:</span>
                              <span className="font-bold text-primary text-lg">
                                {selectedTankType ? `$${PRICE_PER_TYPE}.00` : "$0.00"}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Additional Info */}
                        <div className="space-y-2">
                          <label htmlFor="additionalInfo" className="text-sm font-medium">Additional Information (Optional)</label>
                          <textarea
                            id="additionalInfo"
                            {...form.register("additionalInfo")}
                            className="flex min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                            placeholder="Any specific requirements or preferences..."
                          />
                        </div>

                        {/* Submit Button */}
                        <Button 
                          type="submit" 
                          className="w-full h-12 text-base" 
                          size="lg"
                          disabled={!selectedTankType}
                        >
                          {selectedTankType ? `Submit Order - $${PRICE_PER_TYPE}` : "Select a Tank Type"}
                          <ChevronRight className="ml-2 h-5 w-5" />
                        </Button>

                        <p className="text-xs text-center text-muted-foreground">
                          By submitting this form, you agree to our Terms of Service and Privacy Policy. 
                          We&apos;ll contact you within 30 minutes to confirm your order.
                        </p>
                      </form>
                    </CardContent>
                  </Card>
                </div>

              </div>
            </div>
          </div>
        </section>



        {/* Features Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-8 text-center">Why Choose Our Service?</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <Shield className="h-5 w-5 text-primary" />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">100% Secure</h3>
                    <p className="text-sm text-muted-foreground">VPN protection, encrypted connections, and complete privacy guaranteed.</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <ChevronsUp className="h-5 w-5 text-primary" />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Fast Progression</h3>
                    <p className="text-sm text-muted-foreground">Efficient grinding with optimal strategies and premium account benefits.</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <Check className="h-5 w-5 text-primary" />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Progress Tracking</h3>
                    <p className="text-sm text-muted-foreground">Real-time updates on your tech tree progression and tier unlocks.</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <Target className="h-5 w-5 text-primary" />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Expert Players</h3>
                    <p className="text-sm text-muted-foreground">Top-tier players who know the most efficient grinding paths.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

      </div>
      <Footer />
    </>
  )
}
