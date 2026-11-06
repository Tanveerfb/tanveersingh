"use client";

import { useState, type ReactNode } from "react";
import { Aura } from "@/components/ui/aura";
import { Beam } from "@/components/ui/beam";
import { Button } from "@/components/ui/button";
import { CapsuleDock } from "@/components/ui/capsule-dock";
import { Card, CardBody, CardMeta, CardSkeleton, CardTitle } from "@/components/ui/card";
import { Chip } from "@/components/ui/chip";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { EmptyState } from "@/components/ui/empty-state";
import { InputField, TextareaField } from "@/components/ui/field";
import { KiLoader } from "@/components/ui/ki-loader";
import { MangaActionPanel, MangaPage, MangaPanel, MangaPanelText, MangaPanelTitle } from "@/components/ui/manga-panel";
import { Scouter } from "@/components/ui/scouter";
import { SpecimenTube } from "@/components/ui/specimen-tube";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ToastProvider } from "@/components/ui/toast";
import { SKILL_GROUPS, SKILLS_HEADING } from "@/content/skills";
import { useToast } from "@/hooks/use-toast";

// Elsewhere this route uses sample text from the locked mockups, to show each state.

const DOCK_LINKS = [
  { href: "#buttons", label: "Buttons" },
  { href: "#fields", label: "Fields" },
  { href: "#cards", label: "Cards" },
  { href: "#overlays", label: "Overlays" },
  { href: "#signature", label: "Signature" },
] as const;

function Band({ id, title, children }: { id?: string; title: string; children: ReactNode }) {
  return (
    <section id={id} className="scroll-mt-4 border-b-2 border-dashed border-line py-12">
      <div className="mx-auto grid max-w-page gap-6 px-4">
        <h2 className="cel-lettering m-0 font-display text-5xl/none tracking-cel text-paper">{title}</h2>
        {children}
      </div>
    </section>
  );
}

function Row({ children }: { children: ReactNode }) {
  return <div className="flex flex-wrap items-center gap-4">{children}</div>;
}

function ToastButtons() {
  const toast = useToast();
  return (
    <Row>
      <Button
        size="sm"
        onClick={() => toast({ title: "TRANSMISSION SENT", message: "Message sent. Tanveer will reply to priya@example.com." })}
      >
        Success toast
      </Button>
      <Button
        size="sm"
        variant="secondary"
        onClick={() => toast({ title: "SIGNAL LOST", message: "Message not sent. The connection dropped. Try again in a moment.", tone: "error" })}
      >
        Error toast
      </Button>
    </Row>
  );
}

/** Every kit component in every state, for checking against the locked mockups. */
export function KitPreview() {
  const [auraRun, setAuraRun] = useState(0);
  const [beamRun, setBeamRun] = useState(0);
  const [pageRun, setPageRun] = useState(0);
  const [tubeRun, setTubeRun] = useState(0);

  return (
    <ToastProvider>
      <main id="top" className="pb-28">
        <Band id="buttons" title="Buttons">
          <Row>
            <Button>See my work</Button>
            <Button loading>Sending</Button>
            <Button disabled>See my work</Button>
            <Button variant="secondary">Get in touch</Button>
            <Button variant="ghost">Power up again</Button>
          </Row>
          <Row>
            <Button size="sm">Small</Button>
            <Button>Medium</Button>
            <Button size="lg">Large</Button>
            <Button asChild variant="secondary">
              <a href="#fields">A link</a>
            </Button>
          </Row>
          <Button fullWidth leadingIcon={<span aria-hidden="true">➜</span>}>
            See my work
          </Button>
          <Row>
            <Chip mark="ド" label="Next.js" />
            <Chip mark="ゴ" label="Firebase" />
            <Chip mark="バ" label="Godot" />
          </Row>
        </Band>

        <Band id="fields" title="Fields">
          <div className="grid gap-x-9 gap-y-7.5 md:grid-cols-2">
            <InputField label="Name" placeholder="Your name" autoComplete="name" />
            <InputField label="Name" defaultValue="Priya Sharma" />
            <InputField label="Email" defaultValue="priya@" error="Enter an email address like name@example.com" />
            <InputField label="Email" labelNote="while sending" defaultValue="priya@example.com" disabled />
            <div className="md:col-span-2">
              <TextareaField label="Message" rows={4} maxLength={1000} defaultValue="We need a staff portal for our team. Can we talk next week?" />
            </div>
            <div className="md:col-span-2">
              <TextareaField label="Message" rows={2} defaultValue="Too short" error="Tell me a little more about what you need" />
            </div>
            <div className="md:col-span-2">
              <TextareaField
                label="Message"
                rows={3}
                maxLength={1000}
                defaultValue={"We need a staff portal for our team, with rosters, leave requests and training records in one place. ".repeat(6)}
                error="Keep it under 1000 characters"
              />
            </div>
            <InputField
              label="Email"
              defaultValue="a.very.long.address.that.keeps.going.past.the.edge.of.the.field.for.testing@example.com"
              error="Enter an email address like name@example.com"
            />
          </div>
        </Band>

        <Band id="cards" title="Cards">
          <div className="grid items-start gap-6 md:grid-cols-3">
            <Card>
              <Chip mark="基" label="Base form" />
              <CardTitle>Web Developer</CardTitle>
              <CardMeta>Freelance · Mar 2021 – Oct 2026</CardMeta>
              <CardBody>Websites and web apps for my own clients.</CardBody>
            </Card>
            <Card highlighted tabIndex={0}>
              <Chip mark="全" label="Full power" />
              <CardTitle>Nobility Care Australia</CardTitle>
              <CardMeta>Developer Programmer · Feb 2023 – present</CardMeta>
              <CardBody>Public website, staff portal and learning platform for an NDIS provider.</CardBody>
            </Card>
            <CardSkeleton />
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            <EmptyState title="To be continued" message="This chapter isn't drawn yet. Read the other projects meanwhile." action={<Button size="sm">Read the others</Button>} />
            <div className="grid content-start gap-3">
              <KiLoader label="Sending" />
            </div>
          </div>
        </Band>

        <Band id="overlays" title="Overlays and tabs">
          <Row>
            <Dialog>
              <DialogTrigger asChild>
                <Button>Open dialog</Button>
              </DialogTrigger>
              <DialogContent title="NCA learning platform" description="Block-based module authoring, learning paths by department, a compliance dashboard and certificates.">
                <Button size="sm">Visit the site</Button>
              </DialogContent>
            </Dialog>
          </Row>
          <ToastButtons />
          <Tabs defaultValue="web">
            <TabsList aria-label="Project categories">
              <TabsTrigger value="web">Web</TabsTrigger>
              <TabsTrigger value="ai">AI</TabsTrigger>
              <TabsTrigger value="games">Games</TabsTrigger>
              <TabsTrigger value="m365">Microsoft 365</TabsTrigger>
            </TabsList>
            <TabsContent value="web">Web projects appear here.</TabsContent>
            <TabsContent value="ai">AI projects appear here.</TabsContent>
            <TabsContent value="games">Games appear here.</TabsContent>
            <TabsContent value="m365">Microsoft 365 work appears here.</TabsContent>
          </Tabs>
        </Band>

        <Band id="signature" title="Aura">
          <Aura key={auraRun} className="h-75 border-2 border-ink">
            <p data-aura-target className="cel-lettering m-0 mx-auto w-fit text-center font-display text-cel-hero tracking-cel text-gold uppercase">
              Tanveer
              <span className="block text-orange">Singh</span>
            </p>
          </Aura>
          <div>
            <Button variant="ghost" size="sm" onClick={() => setAuraRun((run) => run + 1)}>
              Power up again
            </Button>
          </div>
        </Band>

        <Band title="Scouter">
          <Scouter groups={SKILL_GROUPS} restingLine={SKILLS_HEADING.restingReading} />
        </Band>

        <Band title="Specimen tube">
          <div key={tubeRun} className="grid max-w-xl grid-cols-2 gap-4 bg-lab p-4">
            <SpecimenTube code="UNIT · RDX" name="Roleodex" description="Private AI chat on local models only." status="ONLINE" />
            <SpecimenTube code="UNIT · FLT" name="fleet-standards" description="My standard for AI coding agents." status="PUBLISHED" />
          </div>
          <div>
            <Button variant="ghost" size="sm" onClick={() => setTubeRun((run) => run + 1)}>
              Refill
            </Button>
          </div>
        </Band>

        <Band title="Manga panel">
          <MangaPage key={pageRun} className="p-3.5">
            <MangaPanel wide>
              <Chip mark="ド" label="Nobility Care Australia" />
              <MangaPanelTitle>NCA public website</MangaPanelTitle>
              <MangaPanelText>Sixteen service pages, three themes, a contrast audit that fails the build on any WCAG AA failure.</MangaPanelText>
            </MangaPanel>
            <MangaActionPanel sfx="ドン!" order={1} />
            <MangaPanel from="right" order={2}>
              <Chip mark="バ" label="Tinker Together" />
              <MangaPanelTitle>Toll</MangaPanelTitle>
              <MangaPanelText>A 3v3 card battler in Godot, in public beta.</MangaPanelText>
            </MangaPanel>
          </MangaPage>
          <div>
            <Button variant="ghost" size="sm" onClick={() => setPageRun((run) => run + 1)}>
              Replay
            </Button>
          </div>
        </Band>

        <Band title="Beam">
          <Beam key={beamRun} />
          <div>
            <Button variant="ghost" size="sm" onClick={() => setBeamRun((run) => run + 1)}>
              Fire
            </Button>
          </div>
        </Band>
      </main>
      <CapsuleDock label="Kit sections" mark={{ href: "#top", label: "TS" }} links={[...DOCK_LINKS]} />
    </ToastProvider>
  );
}
